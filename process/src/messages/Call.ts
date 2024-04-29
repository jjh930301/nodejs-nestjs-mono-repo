import Joi from "joi";

import { OcppMessage } from "./OcppMessage";
import { OcppError } from "../errors/OcppError";
import { Ocpp16Message } from "../ocpp/v16/ocpp1.6message";
// const {Call, CallResult, CallError} = require("./index");

export class Call extends OcppMessage {
  #messageType = Ocpp16Message.CALL_MESSAGE_TYPE;
  _uniqueId;
  _action;
  _payload;
  constructor(message: any | null = null) {
    super();
    this._uniqueId = ""; // "0123456789ABCEDF0123456789ABCDEF0123"; // maximum of 36 characters, to allow for GUIDs
    this._action = "";
    this._payload = {};
    [this.#messageType, this._uniqueId, this._action, this._payload] = message;
    // this._message = message;
  }

  set message(value) {
    [this.#messageType, this._uniqueId, this._action, this._payload] = value;
  }

  get message() {
    return [this.#messageType, this._uniqueId, this._action, this._payload];
  }

  get uniqueId() {
    return this._uniqueId;
  }

  get action() {
    return this._action;
  }

  get payload() {
    return this._payload;
  }

  validate(message = this.message) {
    Call.validateMsgStructure(message);
    this.validateDuplicatedUniqueId(this._uniqueId);
  }

  validateDuplicatedUniqueId(uniqueId) {
    const duplicated = false;
    // check if unique id duplicated
    if (duplicated) {
      throw new OcppError(10003, "DuplicatedMessageUniqueId", {});
    }
  }

  static validateMsgStructure(msgArr) {
    const msgObj = ["MessageTypeId", "UniqueId", "Action", "Payload"].reduce(
      (acc, val, idx) => {
        acc[val] = msgArr[idx];
        return acc;
      },
      {}
    );

    // validate schema
    // TODO: Action 의 최소길이는 reset command 로 min=5 수정하거나 min 의 최소/최대 길이를 제한하지 않는것이 좋을것 같아보임
    const schemas = Joi.object({
      MessageTypeId: Ocpp16Message.CALL_MESSAGE_TYPE,
      UniqueId: Joi.string().min(5).max(36).required(),
      Action: Joi.string().min(5).max(30).required(),
      Payload: Joi.object().required(),
    });

    const validateError = schemas.validate(msgObj);
    if (validateError && validateError.error) {
      throw new OcppError("10001", "FormationViolation", validateError.error);
    }
  }

  static makeMessage(uniqueId, action, payload) {
    const newMessage = [
      Ocpp16Message.CALL_MESSAGE_TYPE,
      uniqueId,
      action,
      payload,
    ];
    Call.validateMsgStructure(newMessage);
    return newMessage;
  }

  static makeUniqueId() {
    // 보통 uniqueId를 숫자로 사용하던데 숫자가 아닌경우도 가능한지 체크해야함
    return "20230110213652";
  }

  toString() {
    return JSON.stringify([
      Ocpp16Message.CALL_MESSAGE_TYPE,
      this._uniqueId,
      this._action,
      this._payload,
    ]);
  }
}
