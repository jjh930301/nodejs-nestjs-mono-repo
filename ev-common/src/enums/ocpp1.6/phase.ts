export enum Phase {
  'L1' = 'L1', // L1 상 측정
  'L2' = 'L2', // L2 상 측정
  'L3' = 'L3', // L3 상 측정
  'N' = 'N', // N 상(Neutral)측정
  'L1-N' = 'L1-N', // N 상(Neutral)을 기준으로 L1 측정
  'L2-N' = 'L2-N', // N 상(Neutral)을 기준으로 L2 측정
  'L3-N' = 'L3-N', // N 상(Neutral)을 기준으로 L3 측정
  'L1-L2' = 'L1-L2', // L1과 L2 사이 측정
  'L2-L3' = 'L2-L3', // L2과 L3 사이 측정
  'L3-L1' = 'L3-L1', // L3과 L1 사이 측정
}
