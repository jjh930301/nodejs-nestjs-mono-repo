import {OcppMessage} from "./OcppMessage";
import * as Joi from "joi";
import {Ocpp16Message} from "../ocpp/v16/ocpp1.6message";
import {OcppError} from "../errors/OcppError";

export class CallError extends OcppMessage {
  #messageType = Ocpp16Message.CALL_ERROR_MESSAGE_TYPE;
  _uniqueId;
  _errorCode;
  _errorDescription;
  _errorDetail;
  constructor() {
    super();
    this._uniqueId = "0123456789ABCEDF0123456789ABCDEF0123";
    this._errorCode;
    this._errorDescription;
    this._errorDetail = {};
  }

  set message(value) {}

  get message() {
    return [
      this.#messageType,
      this._uniqueId,
      this._errorCode,
      this._errorDescription,
      this._errorDetail,
    ];
  }

  get errorCode() {
    return this._errorCode;
  }

  get errorDescription() {
    return this._errorDescription;
  }

  get errorDetails() {
    return this._errorDetail;
  }

  static validateMsgStructure(msgArr) {
    const msgObj = [
      "MessageTypeId",
      "UniqueId",
      "ErrorCode",
      "ErrorDescription",
      "ErrorDetail",
    ].reduce((acc, val, idx) => {
      acc[val] = msgArr[idx];
      return acc;
    }, {});

    // validate schema
    const schemas = Joi.object({
      MessageTypeId: Ocpp16Message.CALL_ERROR_MESSAGE_TYPE,
      UniqueId: Joi.string().max(36).required(),
      ErrorCode: Joi.string(),
      ErrorDescription: Joi.string().allow(""),
      ErrorDetail: Joi.any(),
    });

    const validateError = schemas.validate(msgObj);
    if (validateError && validateError.error) {
      throw new OcppError("10001", "FormationViolation", validateError.error);
    }
  }

  static makeMessage(uniqueId, errorCode, errorDescription, errorDetails) {
    const newMessage = [
      Ocpp16Message.CALL_ERROR_MESSAGE_TYPE,
      uniqueId,
      errorCode,
      errorDescription,
      errorDetails,
    ];
    try {
      CallError.validateMsgStructure(newMessage);
    } catch (err) {
      if (err instanceof OcppError) {
        // Error 메세지 만드는게 잘 못된 경우
        // console.log(err);
      } else {
        throw err;
      }
    }

    return newMessage;
  }
}
