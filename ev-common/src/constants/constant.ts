export const OcppFlowType = {
  Income: "Income", // CP -> CSMS -> CP
  Outcome: "outcomes", // API -> CSMS -> CP
  OutcomeRes: "OutcomeRes", // CP -> CSMS
} as const;

export const QueueName = {
  IncomeRequest: "income-req",
  IncomeResponse: "income-res",
  Outcome: "outcome",
  OutcomeRequest: "outcome-req",
  OutcomeResponse: "outcome-res",
} as const;

export const MessageName = {
  // cp -> csms
  Authorize: "Authorize",
  BootNotification: "BootNotification",
  StartTransaction: "StartTransaction",
  StopTransaction: "StopTransaction",
  StatusNotification: "StatusNotification",
  Heartbeat: "Heartbeat",
  MeterValues: "MeterValues",
  DataTransfer: "DataTransfer",
  FirmwareStatusNotification: "FirmwareStatusNotification",

  // csms -> cp
  ChangeAvailability: "ChangeAvailability",
  Reset: "Reset",
  RemoteStartTransaction: "RemoteStartTransaction",
  RemoteStopTransaction: "RemoteStopTransaction",
  UnlockConnector: "UnlockConnector",
  ClearCache: "ClearCache",
  UpdateFirmware: "UpdateFirmware",
  GetConfiguration: "GetConfiguration",
  ChangeConfiguration: "ChangeConfiguration",
} as const;

const MESSAGE_QUEUE_NAME = {
  IncomeRequest: "income-req",
  IncomeResponse: "income-res",
  Outcome: "outcome",
  OutcomeRequest: "outcome-req",
  OutcomeResponse: "outcome-res",
};
Object.freeze(MESSAGE_QUEUE_NAME);

const MESSAGE_QUEUE_ROUTE_KEY = {
  IncomeRequest: "income-req",
  IncomeResponse: "income-res",
  OutcomeRequest: "outcome-req",
  OutcomeResponse: "outcome-res",
};
Object.freeze(MESSAGE_QUEUE_ROUTE_KEY);

const MESSAGE_QUEUE_EXCHANGE_NAME = {
  Incomes: "incomes",
  Outcomes: "outcomes",
};
Object.freeze(MESSAGE_QUEUE_EXCHANGE_NAME);

export {
  MESSAGE_QUEUE_EXCHANGE_NAME,
  MESSAGE_QUEUE_ROUTE_KEY,
  MESSAGE_QUEUE_NAME,
};
