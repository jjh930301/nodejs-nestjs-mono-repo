import { ProcessType } from "./ProcessType";
import commands from "../commands";
import { OcppError } from "../errors/OcppError";
import { Ocpp16Message } from "../ocpp/v16/ocpp1.6message";
import amqp, { Channel } from "amqplib";
import { MESSAGE_QUEUE_NAME, MESSAGE_QUEUE_ROUTE_KEY } from "../common/message";
import { Call } from "../messages/Call";
import { CallError } from "../messages/CallError";
import { CallResult } from "../messages/CallResult";
// const {QueueSet} = require("../../app");

export class Income extends ProcessType {
  _uuid: string;
  _connection;
  _amqpHost;
  _amqpPort;
  _channel;
  constructor(uuid: string) {
    super();
    this._uuid = uuid;
  }
  async run() {
    try {
      this._connection = await amqp.connect(
        `${this._amqpHost}:${this._amqpPort}`
      );
      this._channel = await this._connection.createChannel(this._uuid);
      this._connection.on("error", async err => {
        console.log(err);
        setTimeout(() => this.run(), 10000);
      });
      this._connection.on("close", async () => {
        console.log("closed amqp connect");
        setTimeout(() => this.run(), 10000);
      });

      await this.startWorker();
    } catch (e) {
      console.log(e);
      setTimeout(() => this.run(), 10000);
    }
  }

  async startWorker() {
    await this._channel.consume(
      //생성된 uuid_income_req로 변경
      `${this._uuid}_${MESSAGE_QUEUE_NAME.IncomeRequest}`,
      async incomeReq => {
        let incomeReqMsg;
        let incomeResMsg;
        // let messageTypeId, uniqueId, action, payload;
        incomeReqMsg = incomeReq?.content?.toString();
        if (!incomeReqMsg) return;

        // incomeReq 는 항상 Call
        incomeReqMsg = JSON.parse(incomeReqMsg);

        const code = incomeReqMsg.code;
        const socketId = incomeReqMsg.socketId;

        const call = new Call(incomeReqMsg.ocppMessage);
        // resultMessage 는 CallResult or CallError

        try {
          // console.log(
          //   `[${code}][${call.uniqueId}] ========== START OF INCOME =========`
          // );
          // message validation
          call.validate();

          // 명령에 대한 인스턴스를 생성함.
          console.info(
            `[${code}][${call.uniqueId}] INCOME Message : `,
            call.action
          );
          const CommandModel = commands[call.action];
          const commandInstance = new CommandModel();
          // 명령마다 payload 생성
          const resPayload = await commandInstance.execute(code, call.payload);

          incomeResMsg = CallResult.makeMessage(call.uniqueId, resPayload);
        } catch (err) {
          if (err instanceof OcppError) {
            // ProtocolError
            // FormationViolation
            // PropertyConstraintViolation, OccurenceConstraintViolation
            // console.error(`[${code}][${call.uniqueId}] OCPP ERROR : `, err);
            incomeResMsg = CallError.makeMessage(
              call.uniqueId,
              err.code,
              err.message,
              err.details[0]
            );
          }
          // console.error(`[${code}][${call.uniqueId}] SERVICE ERROR : `, err);
          incomeResMsg = CallError.makeMessage(
            call.uniqueId,
            Ocpp16Message.OCPP_ERROR_CODE.InternalError,
            err.message,
            {}
          );
        } finally {
          const publishToQueueMessage = {
            code: code,
            socketId: socketId,
            ocppMessage: incomeResMsg ? incomeResMsg : {},
          };

          await super.publishMessage(
            "",
            `${this._uuid}_${MESSAGE_QUEUE_ROUTE_KEY.IncomeResponse}`,
            publishToQueueMessage
          );

          // console.log(
          //   `[${code}][${call.uniqueId}] ========== END OF INCOME =========`
          // );
        }
      },
      { noAck: true }
    );
  }
}
