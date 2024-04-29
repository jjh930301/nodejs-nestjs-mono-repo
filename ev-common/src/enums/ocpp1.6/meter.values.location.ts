export enum MeterValuesLocation {
  Body = 'Body', // 충전 포인트의 내부 측정(예: 온도)
  Cable = 'Cable', // EV와 충전 포인트 사이의 케이블에서 측정한 값
  EV = 'EV', // EV에서 측정된 값
  Inlet = 'Inlet', // 네트워크(그리드) Inlet 연결에서 측정
  Outlet = 'Outlet', // 커넥터에서 측정, 기본 값
}
