export enum ReadingContext {
  'Interruption.Begin' = 'Interruption.Begin', // 중단 시작 시 가져온 값
  'Interruption.End' = 'Interruption.End', // 중단 후 다시 시작할 때 취하는 값
  'Other' = 'Other', // 다른 모든 상황에 대한 값
  'Sample.Clock' = 'Sample.Clock', // 간격이 조정된 클록에서 가져온 값
  'Sample.Periodic' = 'Sample.Periodic', // 트랜잭션 시간 시작과 연관된 주기적인 샘플로서 가져온 값
  'Transaction.Begin' = 'Transaction.Begin', // 트랜잭션의 종료 지점에서 가져온 값
  'Transaction.End' = 'Transaction.End', // 트랜잭션의 시작 지점에서 가져온 값
  'Trigger' = 'Trigger', // TriggerMessage.req 응답으로 가져온 값
}
