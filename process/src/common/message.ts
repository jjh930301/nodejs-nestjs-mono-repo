const OCPP_FLOW_TYPE = {
  Income: "Income", // CP -> CSMS -> CP
  Outcome: "Outcome", // API -> CSMS -> CP
  OutcomeRes: "OutcomeRes", // CP -> CSMS
};
Object.freeze(OCPP_FLOW_TYPE);

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
  OCPP_FLOW_TYPE,
  MESSAGE_QUEUE_EXCHANGE_NAME,
  MESSAGE_QUEUE_ROUTE_KEY,
  MESSAGE_QUEUE_NAME,
};
