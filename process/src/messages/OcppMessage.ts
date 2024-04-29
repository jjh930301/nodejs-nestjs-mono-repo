export class OcppMessage {
  #messageType = 99;
  constructor() {
    // this.#message = [];
  }
  validate() {}
  validateDuplicatedUniqueId(uniqueId) {}
  static vaildateMessage(msg) {}
  static makeMessage(uniqueId, errorCode, errorDescription, errorDetails) {}
}
