export const Ocpp16Message = {
  CALL_MESSAGE_TYPE: 2,
  CALL_RESULT_MESSAGE_TYPE: 3,
  CALL_ERROR_MESSAGE_TYPE: 4,
  OCPP_ERROR_CODE: {
    NotImplemented: "NotImplemented", // Requested Action is not known by receiver
    NotSupported: "NotSupported", // Requested Action is recognized but not supported by the receiver
    InternalError: "InternalError", // An internal error occurred and the receiver was not able to process the requested Action successfully
    ProtocolError: "ProtocolError", // Payload for Action is incomplete
    SecurityError: "SecurityError", // During the processing of Action a security issue occurred preventing receiver from completing the Action successfully
    FormationViolation: "FormationViolation", // Payload for Action is syntactically incorrect or not conform the PDU structure for Action
    PropertyConstraintViolation: "PropertyConstraintViolation", // Payload is syntactically correct but at least one field contains an invalid value
    OccurenceConstraintViolation: "OccurenceConstraintViolation", // Payload for Action is syntactically correct but at least one of the fields violates occurence constraints
    TypeConstraintViolation: "TypeConstraintViolation", // Payload for Action is syntactically correct but at least one of the fields violates data type constraints (e.g. “somestring”: 12)
    GenericError: "GenericError", // Any other error not covered by the previous ones
  },
  // Result of registration in response to BootNotification.req.
  RegistrationStatus: {
    Accepted: "Accepted", // Charge point is accepted by Central System.
    Pending: "Pending", // Central System is not yet ready to accept the Charge Point. Central System may send messages to retrieve information or prepare the Charge Point.
    Rejected: "Rejected", // Charge point is not accepted by Central System. This may happen when the Charge Point id is not known by Central System.
  },
  DataTransferStatus: {
    Accepted: "Accepted", // Identifier is allowed for charging.
    Rejected: "Rejected", // Identifier has been blocked. Not allowed for charging.
    UnknownMessageId: "UnknownMessageId", // Identifier has expired. Not allowed for charging.
    UnknwonVendor: "UnknwonVendor", // Identifier is unknown. Not allowed for charging
  },
  AuthorizationStatus: {
    Accepted: "Accepted", // Identifier is allowed for charging.
    Blocked: "Blocked", // Identifier has been blocked. Not allowed for charging.
    Expired: "Expired", // Identifier has expired. Not allowed for charging.
    Invalid: "Invalid", // Identifier is unknown. Not allowed for charging
    ConcurrentTx: "ConcurrentTx", // Identifier is already involved in another transaction and multiple transactions are not allowed. (Only relevant for a StartTransaction.req.)
  },
  ChargingPointErrorCode: {
    ConnectorLockFailure: "ConnectorLockFailure",
    EVCommunicationError: "EVCommunicationError",
    GroundFailure: "GroundFailure",
    HighTemperature: "HighTemperature",
    InternalError: "InternalError",
    LocalListConflict: "LocalListConflict",
    NoError: "NoError",
    OtherError: "OtherError",
    OverCurrentFailure: "OverCurrentFailure",
    PowerMeterFailure: "PowerMeterFailure",
    PowerSwitchFailure: "PowerSwitchFailure",
    ReaderFailure: "ReaderFailure",
    ResetFailure: "ResetFailure",
    UnderVoltage: "UnderVoltage",
    OverVoltage: "OverVoltage",
    WeakSignal: "WeakSignal",
  },
  ChargePointStatus: {
    Available: "Available",
    Preparing: "Preparing",
    Charging: "Charging",
    SuspendedEVSE: "SuspendedEVSE",
    SuspendedEV: "SuspendedEV",
    Finishing: "Finishing",
    Reserved: "Reserved",
    Unavailable: "Unavailable",
    Faulted: "Faulted",
  },

  Reason: {
    EmergencyStop: "EmergencyStop", // 긴급 중지 버튼
    EVDisconnected: "EVDisconnected", // 케이블 비연결
    HardReset: "HardReset", // 하드리셋 명령
    Local: "Local", // 충전기에서 충전중지 요청(사용자가 충전중지 버튼 클릭)
    Other: "Other", // 그 외.
    PowerLoss: "PowerLoss", // 파워 손실
    Reboot: "Reboot", // 충전기의 상태가 재설정, 재부팅 상태
    Remote: "Remote", // 원격 충전중지 요청
    SoftReset: "SoftReset", // 소프트 리셋 명령
    UnlockCommand: "UnlockCommand", // 서버에서 커넥터 잠금해제 명령 요청
    DeAuthorized: "DeAuthorized", // StartTransaction.conf 내 승인상태로 인한 중지
  },
  ReadingContext: {
    "Interruption.Begin": "Interruption.Begin", // 중단 시작 시 가져온 값
    "Interruption.End": "Interruption.End", // 중단 후 다시 시작할 때 취하는 값
    "Other": "Other", // 다른 모든 상황에 대한 값
    "Sample.Clock": "Sample.Clock", // 간격이 조정된 클록에서 가져온 값
    "Sample.Periodic": "Sample.Periodic", // 트랜잭션 시간 시작과 연관된 주기적인 샘플로서 가져온 값
    "Transaction.Begin": "Transaction.Begin", // 트랜잭션의 종료 지점에서 가져온 값
    "Transaction.End": "Transaction.End", // 트랜잭션의 시작 지점에서 가져온 값
    "Trigger": "Trigger", // TriggerMessage.req 응답으로 가져온 값
  },
  ValueFormat: {
    Raw: "Raw", // 데이터는 정수 / 십진수 숫자 데이터로 해석
    SignedData: "SignedData", // 데이터는 부호 있는 이진 데이터 블록으로 표현되며 16 진수 데이터로 인코딩
  },
  Measurand: {
    "Current.Export": "Current.Export", // EV로 부터 순간 전류 흐름
    "Current.Import": "Current.Import", // EV로 순간 전류 흐름
    "Current.Offered": "Current.Offered", // EV로 제공된 최대 전류
    "Energy.Active.Export.Register": "Energy.Active.Export.Register", // EV로 보낸 에너지(Wh / kWh)
    "Energy.Active.Import.Register": "Energy.Active.Import.Register", // EV에서 유입된 에너지(Wh / kWh)
    "Energy.Reactive.Export.Register": "Energy.Reactive.Export.Register", // EV로 보낸 무효 에너지(varh / kvarh)
    "Energy.Reactive.Import.Register": "Energy.Reactive.Import.Register", // EV에서 유입된 무효 에너지(varh / kvarh)
    "Energy.Active.Export.Interval": "Energy.Active.Export.Interval", // EV로 보낸 에너지(Wh / kWh)
    "Energy.Active.Import.Interval": "Energy.Active.Import.Interval", // EV에서 유입된 에너지(Wh / kWh)
    "Energy.Reactive.Export.Interval": "Energy.Reactive.Export.Interval", // EV로 보낸 무효 에너지(varh / kvarh)
    "Energy.Reactive.Import.Interval": "Energy.Reactive.Import.Interval", // EV에서 유입된 무효 에너지(varh / kvarh)
    "Frequency": "Frequency", // 전력선에 흐르는 주파수의 순간 값
    "Power.Active.Export": "Power.Active.Export", // EV에서 내보낸 순시 유효 전력(varh or kvarh)
    "Power.Active.Import": "Power.Active.Import", // EV로 보낸 순시 유효 전력(varh or kvarh)
    "Power.Factor": "Power.Factor", // 총 에너지 흐름의 순시 역률
    "Power.Offered": "Power.Offered", // EV에 제공되는 최대전력
    "Power.Reactive.Export": "Power.Reactive.Export", // EV에서 유입된 순시 무효 전력(varh or kvarh)
    "Power.Reactive.Import": "Power.Reactive.Import", // EV로 보낸 순시 무효 전력(varh or kvarh)
    "RPM": "RPM", // FAN 속도
    "SoC": "SoC", // 충전중인 차량의 배터리 충전 상태(비율)
    "Temperature": "Temperature", // 충전 포인트의 내부 온도
    "Voltage": "Voltage", // 순간적인 AC RMS 공급 전압
  },
  Phase: {
    "L1": "L1", // L1 상 측정
    "L2": "L2", // L2 상 측정
    "L3": "L3", // L3 상 측정
    "N": "N", // N 상(Neutral)측정
    "L1-N": "L1-N", // N 상(Neutral)을 기준으로 L1 측정
    "L2-N": "L2-N", // N 상(Neutral)을 기준으로 L2 측정
    "L3-N": "L3-N", // N 상(Neutral)을 기준으로 L3 측정
    "L1-L2": "L1-L2", // L1과 L2 사이 측정
    "L2-L3": "L2-L3", // L2과 L3 사이 측정
    "L3-L1": "L3-L1", // L3과 L1 사이 측정
  },
  Location: {
    Body: "Body", // 충전 포인트의 내부 측정(예: 온도)
    Cable: "Cable", // EV와 충전 포인트 사이의 케이블에서 측정한 값
    EV: "EV", // EV에서 측정된 값
    Inlet: "Inlet", // 네트워크(그리드) Inlet 연결에서 측정
    Outlet: "Outlet", // 커넥터에서 측정, 기본 값
  },
  UnitOfMeasure: {
    Wh: "Wh", // Watt - hour(에너지). 기본값
    kWh: "kWh", // kiloWatt - hour (에너지)
    varh: "varh", // Var - hour (무효 에너지)
    kvarh: "kvarh", // Kilovar-hour (무효 에너지)
    W: "W", // Watts(전력)
    kW: "kW", // Kilowatts (전력)
    VA: "VA", // VoltAmpere(피상전력)
    kVA: "kVA", // kiloVoltAmpere(피상전력)
    var: "var", // Vars (무효 전력)
    kvar: "kvar", // kilovars (무효 전력)
    A: "A", // Ampere(전류)
    V: "V", // Voltage(r.m.s. AC)
    Celsius: "Celsius", // Degrees(온도)
    Fahrenheit: "Fahrenheit", // Degrees(온도)
    K: "K", // Degrees Kelvin(온도)
    Percent: "Percent", // Percentage
  },
  ConfigurationKey: {
    AuthorizeRemoteTxRequests: "AuthorizeRemoteTxRequests",
    AllowOfflineTxForUnknownId: "AllowOfflineTxForUnknownId",
    AuthorizationCacheEnabled: "AuthorizationCacheEnabled",
    BlinkRepeat: "BlinkRepeat",
    ClockAlignedDataInterval: "ClockAlignedDataInterval",
    ConnectionTimeOut: "ConnectionTimeOut",
    ConnectorPhaseRotation: "ConnectorPhaseRotation",
    GetConfigurationMaxKeys: "GetConfigurationMaxKeys",
    HeartbeatInterval: "HeartbeatInterval",
    LightIntensity: "LightIntensity",
    LocalAuthorizeOffline: "LocalAuthorizeOffline",
    LocalPreAuthorize: "LocalPreAuthorize",
    MaxEnergyOnInvalidId: "MaxEnergyOnInvalidId",
    MeterValuesAlignedData: "MeterValuesAlignedData",
    MeterValuesAlignedDataMaxLength: "MeterValuesAlignedDataMaxLength",
    MeterValuesSampledData: "MeterValuesSampledData",
    MeterValuesSampledDataMaxLength: "MeterValuesSampledDataMaxLength",
    MeterValueSampleInterval: "MeterValueSampleInterval",
    MinimumStatusDuration: "MinimumStatusDuration",
    NumberOfConnectors: "NumberOfConnectors",
    ResetRetries: "ResetRetries",
    ConnectorPhaseRotationMaxLength: "ConnectorPhaseRotationMaxLength",
    StopTransactionOnEVSideDisconnect: "StopTransactionOnEVSideDisconnect",
    StopTransactionOnInvalidId: "StopTransactionOnInvalidId",
    StopTxnAlignedData: "StopTxnAlignedData",
    StopTxnAlignedDataMaxLength: "StopTxnAlignedDataMaxLength",
    StopTxnSampledData: "StopTxnSampledData",
    SupportedFeatureProfiles: "SupportedFeatureProfiles",
    StopTxnSampledDataMaxLength: "StopTxnSampledDataMaxLength",
    SupportedFeatureProfilesMaxLength: "SupportedFeatureProfilesMaxLength",
    TransactionMessageAttempts: "TransactionMessageAttempts",
    TransactionMessageRetryInterval: "TransactionMessageRetryInterval",
    WebSocketPingInterval: "WebSocketPingInterval",
    LocalAuthListEnabled: "LocalAuthListEnabled",
    LocalAuthListMaxLength: "LocalAuthListMaxLength",
    SendLocalListMaxLength: "SendLocalListMaxLength",
    ReserveConnectorZeroSupported: "ReserveConnectorZeroSupported",
    ChargeProfileMaxStackLevel: "ChargeProfileMaxStackLevel",
    ChargingScheduleAllowedChargingRateUnit:
      "ChargingScheduleAllowedChargingRateUnit",
    ChargingScheduleMaxPeriods: "ChargingScheduleMaxPeriods",
    ConnectorSwitch3to1PhaseSupported: "ConnectorSwitch3to1PhaseSupported",
    MaxChargingProfilesInstalled: "MaxChargingProfilesInstalled",
    UnlockConnectorOnEVSideDisconnect: "UnlockConnectorOnEVSideDisconnect",
  },
};
