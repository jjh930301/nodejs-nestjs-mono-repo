import { ProcessType } from "./ProcessType";
import commands from "../commands";
import { OcppError } from "../errors/OcppError";
import { ServiceError } from "../errors/ServiceError";
import amqp from "amqplib";
import {
  MESSAGE_QUEUE_NAME,
  MESSAGE_QUEUE_EXCHANGE_NAME,
  MESSAGE_QUEUE_ROUTE_KEY,
} from "../common/message";
import { Call } from "../messages/Call";

export class Outcome extends ProcessType {
  _uuid: string;
  _connection;
  _amqpHost;
  _amqpPort;
  _channel;
  constructor(uuid) {
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
      setTimeout(() => this.run(), 10000);
    }
  }

  async startWorker() {
    await this._channel.consume(
      `${this._uuid}_${MESSAGE_QUEUE_NAME.Outcome}`,
      async outcome => {
        const outcomeMsg = outcome?.content?.toString();
        if (!outcomeMsg) return;
        const outcomeMsgJson = JSON.parse(outcomeMsg);

        const { messageUniqueId, action, code, remotePayload } = outcomeMsgJson;
        let outcomeReqMsg;
        let socketId;

        const publishToQueueMessage = {
          code: code,
          socketId: "",
          ocppMessage: {},
        };

        // outcomeMsg 는 항상 Call
        // API 서버에서는 messageId(uniqueId) 없이 요청
        // Action 은 API 서버에서 등록
        // 명령에 대한 인스턴스를 생성함.
        try {
          const CommandModel = commands[action];

          const commandInstance = new CommandModel();

          const payload = await commandInstance.makeRequestPayload(
            messageUniqueId,
            code,
            remotePayload
          );

          outcomeReqMsg = Call.makeMessage(messageUniqueId, action, payload);

          publishToQueueMessage.ocppMessage = outcomeReqMsg
            ? outcomeReqMsg
            : {};
          publishToQueueMessage.socketId = socketId;
          // publishToQueueMessage.socketId =
          //     "fbwycRTN7XVZQ/UOlzLkFw==";
          await super.publishMessage(
            "",
            `${this._uuid}_${MESSAGE_QUEUE_ROUTE_KEY.OutcomeRequest}`,
            publishToQueueMessage
          );
        } catch (err) {
          if (err instanceof OcppError) {
            // ProtocolError
            // FormationViolation
            // PropertyConstraintViolation, OccurenceConstraintViolation
            console.log("OCPP ERROR");
            console.log(err);
          } else if (err instanceof ServiceError) {
            // console.log("ERROR OCCUR: ", incomeResMsg);
            console.log("SERVICE ERROR");
            console.log(err);
          } else {
            console.log("ELSE ERROR");
            console.log(err);
          }
        }
      },
      { noAck: true }
    );
  }
}
