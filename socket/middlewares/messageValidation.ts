import Joi from "joi";

export default async function (messageTypeId, message) {
  let msgObj;
  let schemas;
  if (messageTypeId === 2) {
    msgObj = ["MessageTypeId", "UniqueId", "Action", "Payload"].reduce(
      (acc, val, idx) => {
        acc[val] = message[idx];
        return acc;
      },
      {}
    );
    // TODO: OCPP 처리서버에 따라 수정 가능성 존재
    schemas = Joi.object({
      MessageTypeId: Joi.number(),
      UniqueId: Joi.string().min(5).max(36).required(),
      Action: Joi.string().min(5).max(30).required(),
      Payload: Joi.object().required(),
    });
  } else if (messageTypeId === 3) {
    msgObj = ["MessageTypeId", "UniqueId", "Payload"].reduce(
      (acc, val, idx) => {
        acc[val] = message[idx];
        return acc;
      },
      {}
    );

    schemas = Joi.object({
      MessageTypeId: Joi.number(),
      UniqueId: Joi.string().min(5).max(36).required(),
      Payload: Joi.object().required(),
    });
  } else if (messageTypeId === 4) {
    // eslint-disable-next-line max-len
    msgObj = [
      "MessageTypeId",
      "UniqueId",
      "ErrorCode",
      "ErrorDescription",
      "ErrorDetails",
    ].reduce((acc, val, idx) => {
      acc[val] = message[idx];
      return acc;
    }, {});

    schemas = Joi.object({
      MessageTypeId: Joi.number(),
      UniqueId: Joi.string().max(36).required(),
      ErrorCode: Joi.string(),
      ErrorDescription: Joi.string().allow(""),
      ErrorDetail: Joi.any(),
    });
  }

  // validate schema
  const validateError = schemas.validate(msgObj);
  if (validateError && validateError.error) {
    console.error(validateError);
    console.error(message);
    return false;
  }
  return true;
}
