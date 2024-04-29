export class OcppError extends Error {
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

    Object.setPrototypeOf(this, OcppError.prototype);
  }
}
