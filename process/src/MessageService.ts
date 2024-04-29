import { OcppMessage } from "./messages/OcppMessage";
import { OcppError } from "./errors/OcppError";
import { Ocpp16Message } from "./ocpp/v16/ocpp1.6message";
import { OcppCommand } from "./commands/OcppCommand";
import { ServiceError } from "./errors/ServiceError";
import { Call } from "./messages/Call";
import { CallError } from "./messages/CallError";
import { CallResult } from "./messages/CallResult";

export class MessageService {
  #uuid;
  #socket_id;
  #ocpp_message;
  constructor(message) {
    this.#uuid = message[0];
    this.#socket_id = message[1];
    this.#parsingOcppMessage(message[3]);
  }

  #parsingOcppMessage(ocppMessage) {
    const messageTypeId = ocppMessage[0];
    let ocppMsgObj;
    switch (messageTypeId) {
      case Ocpp16Message.CALL_MESSAGE_TYPE: {
        ocppMsgObj = new Call();
        ocppMsgObj.message = ocppMessage;
      }
      case Ocpp16Message.CALL_RESULT_MESSAGE_TYPE: {
        ocppMsgObj = new CallResult();
        ocppMsgObj.message = ocppMessage;
      }
      case Ocpp16Message.CALL_ERROR_MESSAGE_TYPE: {
        ocppMsgObj = new CallError();
        ocppMsgObj.message = ocppMessage;
      }
      default:
        throw new OcppError(100001, "Message Not Allowed", {});
    }

    this.#ocpp_message = ocppMsgObj;
  }

  // command 객체 리턴
  #extractCommandFromMessage(ocppMessage) {
    return new OcppCommand();
  }

  executeMessage() {
    let returnPayload;

    const command = this.#extractCommandFromMessage(this.#ocpp_message);
    returnPayload = command.makePayload(this.#uuid);

    return returnPayload;
  }
  createMessage() {
    let ocppMessage;
    try {
      const ocppPayload = this.executeMessage();
      ocppMessage = CallResult.makeMessage(
        this.#ocpp_message.uniqueId,
        ocppPayload
      );
    } catch (err) {
      // rollback db transaction
      if (err instanceof OcppError) {
        ocppMessage = CallError.makeMessage(
          this.#ocpp_message.uniqueId,
          err.code,
          err.message,
          err.details
        );
      } else {
        // Service Error
        console.log("SERVICE ERROR");
        throw ServiceError;
      }
    }

    // 메세지 리턴
    return {
      uuid: this.#uuid,
      socket_id: this.#socket_id,
      ocpp: ocppMessage, //[3, "012345678", { a: 1, b: 2, c: 4 }],
    };
  }
}
