import { ModelConnectorsType } from './model.connectors.type';

export enum GovConnectorEnum {
  '01' = ModelConnectorsType.CHADEMO, // 'DC차데모',
  '02' = ModelConnectorsType.J1772, // '승용차 AC완속',
  '03' = ModelConnectorsType['3PHASE'], // 'DC차데모+AC3상',
  '04' = ModelConnectorsType.CCS1, // 'DC콤보',
  '05' = ModelConnectorsType.CHADEMO, // 'DC차데모+DC콤보',
  '06' = ModelConnectorsType.CHADEMO, // 'DC차데모+AC3상+DC콤보',
  '07' = ModelConnectorsType['3PHASE'], // 'AC급속3상',
}

export const GovMethod = {
  S: false, // 단독
  C: true, // 동시
};

export const GovChargepointStatus = {
  0: 'Faulted', // 알수없음
  1: 'Faulted', // 통신이상
  2: 'Preparing', // 충전대기
  3: 'Charging', // 충전중
  4: 'Unavailable', // 운영중지
  5: 'Unavailable', // 점검중
  6: 'Reserved', // 예약중
  9: 'Faulted', // 상태미확인
};
