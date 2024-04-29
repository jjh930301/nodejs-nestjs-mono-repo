/* 
  1. 고장등록
  2. 고장확인중
  3. 수리중(사용불가)
  4. 수리완료(사용가능)
  5. 고장아님(사용가능)
*/
export enum TroubleReportStatus {
  REPORTED = 'REPORTED',
  CHECKING = 'CHECKING',
  FIXING = 'FIXING',
  FIXED = 'FIXED',
  NOISSUE = 'NOISSUE',
}
