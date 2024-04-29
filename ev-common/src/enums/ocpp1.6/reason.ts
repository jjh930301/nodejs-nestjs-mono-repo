export enum Reason {
  EmergencyStop = 'EmergencyStop', // 긴급 중지 버튼
  EVDisconnected = 'EVDisconnected', // 케이블 비연결
  HardReset = 'HardReset', // 하드리셋 명령
  Local = 'Local', // 충전기에서 충전중지 요청(사용자가 충전중지 버튼 클릭)
  Other = 'Other', // 그 외.
  PowerLoss = 'PowerLoss', // 파워 손실
  Reboot = 'Reboot', // 충전기의 상태가 재설정, 재부팅 상태
  Remote = 'Remote', // 원격 충전중지 요청
  SoftReset = 'SoftReset', // 소프트 리셋 명령
  UnlockCommand = 'UnlockCommand', // 서버에서 커넥터 잠금해제 명령 요청
  DeAuthorized = 'DeAuthorized', // StartTransaction.conf 내 승인상태로 인한 중지
}
