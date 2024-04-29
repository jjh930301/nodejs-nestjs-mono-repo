export enum RfidCardStatus {
  APPLIED = 'APPLIED',
  ISSUED = 'ISSUED', // 발급됨,
  DELIVERED = 'DELIVERED', //배송됨
  VERIFIED = 'VERIFIED',
  MISSING = 'MISSING', //인증됨 , 사용가능상태
  UNAVAILABLE = 'UNAVAILABLE', //사용불가상태 => 고객센터 연락필요,admin에서 변경해준다. 부정확인 사용 등등
}
