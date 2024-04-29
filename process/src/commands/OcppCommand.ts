import dayjs from "dayjs";
import { ajv } from "../utils/ajv";
import { OcppError } from "../errors/OcppError";
import { ServiceError } from "../errors/ServiceError";
import { Ocpp16Message } from "../ocpp/v16/ocpp1.6message";
export class OcppCommand {
  #uniqueId;
  constructor() {}

  makePayload(uuid) {
    return [];
  }

  execute(code, requestPayload) {}

  // 추가부분
  get uniqueId() {
    return this.#uniqueId;
  }
  set uniqueId(uniqueId) {
    this.#uniqueId = uniqueId;
  }

  findMessage(uniqueId) {
    // 원격제어 테이블에서 보낸 메시지 찾아서 반환
  }
  makeUniqueId() {
    // this.#uniqueId = dayjs().format("YYYYMMDDHHmmss");
  }

  async validate(schema, payload) {
    // ajv / enjoy(찾아봐야함)  validation (jsonSchemaValidator)
    // true / false 로 반환

    const valid = ajv.validate(schema, payload);

    if (!valid) {
      switch (ajv.errors?.[0].keyword) {
        case "required": {
          throw new OcppError(
            Ocpp16Message.OCPP_ERROR_CODE.OccurenceConstraintViolation,
            "JSON Schema Validation Fail",
            ajv.errors
          );
        }
        case "type": {
          throw new OcppError(
            Ocpp16Message.OCPP_ERROR_CODE.TypeConstraintViolation,
            "JSON Schema Validation Fail",
            ajv.errors
          );
        }
        default: {
          throw new OcppError(
            Ocpp16Message.OCPP_ERROR_CODE.FormationViolation,
            "JSON Schema Validation Fail",
            ajv.errors
          );
        }
      }
    }
  }
}
