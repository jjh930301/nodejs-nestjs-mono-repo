import { ProcessType } from "./ProcessType";
import commands from "../commands";
import amqp from "amqplib";
import { MESSAGE_QUEUE_NAME } from "../common/message";
import _ from "lodash";
import { manager } from "../app";

export class OutcomeRes extends ProcessType {
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
      console.log(e);
      setTimeout(() => this.run(), 10000);
    }
  }

  async startWorker() {
    await this._channel.consume(
      `${this._uuid}_${MESSAGE_QUEUE_NAME.OutcomeResponse}`,
      async outcomeResMsg => {
        // outcomeResMsg 는 CallResult, CallError
        let code;
        let socketId;
        let ocppMessage;
        try {
          const outcomeMsg = outcomeResMsg?.content?.toString();
          if (!outcomeMsg) return;
          const messageJson = JSON.parse(outcomeMsg);
          code = messageJson.code;

          socketId = messageJson.socketId;
          ocppMessage = messageJson.ocppMessage;
        } catch {
          // 만약 에러 타입이 OCPP ERROR 에 속한다면 outcomeReqMsg => CallError 형태여야 함
          // ProtocolError? 하고 다시 보내야 에러났다고 다시 보내야되나?
          // 큐에 등록된 메세지 파싱이 실패한 경우
          // TODO: History 추가 후 ERROR QUEUE 로 전달?
          // throw new Error("Queue Message Pasing Fail");
          console.error("Queue Message Pasing Fail");
        }

        try {
          const messageUniqueId = ocppMessage[1];

          // 호출 되었던 명령을 찾아 (원격제어 or DataTransfer or ...)

          // 명령에 맞는 인스턴스 생성
          const CommandModel = commands["action"];

          const commandInstance = new CommandModel();

          await commandInstance.execute(code, ocppMessage);
        } catch (e) {
          console.error(e);
        }
      },
      { noAck: true }
    );
  }
}
