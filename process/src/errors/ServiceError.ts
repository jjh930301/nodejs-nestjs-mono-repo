// module.exports = {
//     ERROR_MAKE_MESSAGE: "MakeMessageError",
//     ERROR_INTERNAL: "InternalError",
//     ERROR_VALIDATION: "ValidationError",
// };

export class ServiceError extends Error {
  code;
  message;
  details;
  constructor(code, message, details) {
    super(message);
    this.code = code;
    if (typeof message !== "object") {
      this.message = {
        message,
      };
    } else {
      this.message = message;
    }
    this.details = details;

    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}
