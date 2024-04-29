import {OcppError} from "../errors/OcppError";
import {Ocpp16Message} from "../ocpp/v16/ocpp1.6message";
import {OcppMessage} from "./OcppMessage";
import * as Joi from "joi";
export class CallResult extends OcppMessage {
  #messageType = Ocpp16Message.CALL_RESULT_MESSAGE_TYPE;
  _uniqueId;
  _payload: any;
  constructor() {
    super();
    this._uniqueId = "0123456789ABCEDF0123456789ABCDEF0123"; // maximum of 36 characters, to allow for GUIDs
    this._payload = {};
  }

  set message(value) {
    CallResult.validate(value);
    [this.#messageType, this._uniqueId, this._payload] = value;
  }

  get message() {
    return [this.#messageType, this._uniqueId, this._payload];
  }

  get uniqueId() {
    return this._uniqueId;
  }

  get payload() {
    return this._payload;
  }

  static validate(msgArr) {
    const msgObj = ["MessageTypeId", "UniqueId", "Payload"].reduce(
      (acc, val, idx) => {
        acc[val] = msgArr[idx];
        return acc;
      },
      {}
    );

    // validate schema
    const schemas = Joi.object({
      MessageTypeId: Ocpp16Message.CALL_RESULT_MESSAGE_TYPE,
      UniqueId: Joi.string().min(5).max(36).required(),
      Payload: Joi.object().required(),
    });

    const validateError = schemas.validate(msgObj);
    if (validateError && validateError.error) {
      throw new OcppError("10001", "VALIDATION_FAIL", validateError.error);
    }
  }

  static makeMessage(uniqueId, payload): any {
    const newMessage = [
      Ocpp16Message.CALL_RESULT_MESSAGE_TYPE,
      uniqueId,
      payload,
    ];
    CallResult.validate(newMessage);
    return newMessage;
  }

  toString() {
    return JSON.stringify([
      Ocpp16Message.CALL_RESULT_MESSAGE_TYPE,
      this._uniqueId,
      this._payload,
    ]);
  }
}
