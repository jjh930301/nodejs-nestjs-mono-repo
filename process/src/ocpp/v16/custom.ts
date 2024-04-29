export const Custom = {
  // 명령별 특수 기능을 수행하기 위한 constant - ex) BootNotification : SocketId 를 update
  CommandType: {
    SyncSocket: ["BootNotification"],
  },

  // DataTransfer 지원 명령
  DataTransferMessages: [
    "REQ_PRICE",
    "REQ_VAN_PRE",
    "REQ_VAN_POST",
    "REQ_CHARGE_AMT",
    "REQ_FIXED_AMT",
  ],

  TransactionRowStatus: {
    COMPLETED: "COMPLETED",
    CHARGING: "CHARGING",
    STANDBY: "STANDBY",
  },

  TransactionStartStopType: {
    LOCAL: "LOCAL",
    REMOTE: "REMOTE",
  },

  ChargepointRoamingStatus: {
    UNKNOWN: 0, // 상태미확인
    COMMUNICATION_FAULT: 1, // 통신이상
    AVAILABLE: 2, // 충전대기
    CHARGING: 3, // 충전중
    UNAVAILABLE: 4, // 운영중지
    FAULTED: 5, // 점검중
    RESERVED: 6, // 예약중
    SUSPENDED_EV: 9, // 알수없음
  },
};
