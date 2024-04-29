import { BidCode } from '../enums/bid.code';

export type FindOneMembershipReq = {
  bid: string; // ME : 환경부 | KP : 한국전력
  bkey: string; // 발급키
  kind: 3; // 고정
  cardno: string; // 환경부 회원카드 번호
};

export type FindMembershipRes = {
  result: string; // 결과 코드
  rdate: string; // 응답 기준 시간
  rowcnt: string | number; // 응답 건수
  card?: [
    {
      bid: string; // 기관ID
      no: string; // 회원카드
      stop: string; // 카드 정지 여부
      regdate: string; // 회원카드 통합서버 등록일시
      upddate: string; // 회원카드 통합서버 갱신일시
    },
  ]; //
  errcode?: string; // 에러 코드
  errdtl?: string; // 에러 상세 내용
};

export type UpdateMembershipReq = {
  bid: string; // 기관ID
  bkey: string; // 기관 인증키
  card: [
    {
      no: string; // 카드 번호
      stop: string; // 카드 정지 여부 Y/N
    },
  ];
};

export type UpdateMembershipRes = {
  result: string;
  rdate: string;
  reqcnt: string | number; // 회원카드 신규 등록 건수
  inscnt: string | number; // 회원카드 정보 변경 건수
  dupcnt: string | number; // 중복 회원카드 건수
  limitcnt: number; // 요청 초과 건수
  errcnt: string;
  errcode: string;
  errdtl: string;
  errlist: [
    {
      no: string; // 회원카드
      errmsg: string; // 개별 항목에 대한 에러 내역
    },
  ];
};

export type InsertRoamingChargerReq = {
  bid: string; // 기관ID
  bkey: string; // 기관 인증키
  trade: [
    {
      no: string; // 회원카드
      sid: string; // 충전소 ID
      cid: string; // 충전기 ID
      tbid: string; // 회원카드 소속기관ID ME | KP
      tsdt: string; // 충전 시작 일시
      tedt: string; // 충전 종료 일시
      btid?: string; // 기관 거래 ID
      pow: string; // 충전량 (1wh)
      mon: string; // 충전금액
      bprice?: string; // 충전기관 단가
      tbprice?: string; // 회원카드 소속기관 단가
      bmon?: string; // 충전기관 단가 충전금액
    },
  ];
};

export type InsertRoamingChargerRes = {
  result: string; // 0(성공)/1(일부성공)/2(실패)
  rdate: string; // 20180201123030
  reqcnt: number; // 요청 데이터 건수
  inscnt: number; // 충전이력 등록 건수
  dupcnt: number; // 충복 충전이력 건수
  limitcnt: number; // 요청 초과 건수
  errcnt: number; // 에러 건수 (errlist에서 에러 확인)
  errcode: string; // 에러 코드
  errdtl: string; // 에러 상세 내역
  errlist: [
    {
      no: string; // 회원카드
      sid: string; // 충전소 ID
      cid: string; // 충전기 ID
      tbid: string; // 회원카드 소속기관ID
      tsdt: string; // 충전 시작 일시
      btid: string; // 기관 거래ID (내부 거래 식별번호)
      errmsg: string; // 개별 항목에 대한 에러 내역
    },
  ];
};

export type FindAllStationsReq = {
  bid: string;
  bkey: string;
  kind: '1' | '2';
  rbid?: 'CR';
  pageno: number;
  rowcnt: number;
};

export type FindAllStationsCInfo = {
  bid: string; // 기관ID "CR",
  sid: string; // 충전소ID "D00001",
  cid: string; // 충전기ID "01",
  zcode: string; // 지역코드 "44",
  name: string; // 충전소명 "팜앤팜치유정원(부여글램핑판)",
  addr: string; // 지번 주소 "충청남도 부여군 옥산면 신안리 398",
  addrdtl: string; // 지번주소 상세 "부여 글램핑판",
  daddr: string; // 도로명주소 "충청남도 부여군 옥산면 신안로40번길 90",
  daddrdtl: string; // 도로명주소 상세 "부여 글램핑판",
  kind: string; // 충전소구분 코드 "E0",
  kinddtl: string; // 충전소구분 상세 코드 "E003",
  gps: string; // 위도,경도 "36.184079,126.7225641",
  usetime: string; // 이용가능시간 "24시간 이용가능",
  free: string; // 주차비 무료 여부 "N",
  freedtl: string; // 주차비 상세 정보 "",
  bname: string; // 운영기관 명칭 "크로커스",
  bcall: string; // 운영기관 연락처 "1600-2693",
  type: string; // 충전기타입 코드 "02",
  reserv: string; // 예약 가능 여부 "N",
  member: string; // 멤버십 여부 "Y",
  pay: string; // 충전요금 유료 여부 "Y",
  fee: string; // 충전 케이블 유무 "",
  cable: string; // 충전 케이블 유무 "Y",
  status: number; // 충전기 상태 9,
  statdt: string; // 상태 갱신 일시 "20240117144554",
  note: string; // 특이사항 "",
  bmngid: string; // 충전기 기관내부관리ID "CRD0000101",
  limityn: string; // 이용자 제한 여부 "N",
  limitdetail: string; // 이용제한 사유 "",
  delyn: string; // 삭제 여부 "N",
  deldetail: string; // 삭제 사유 "",
  last_tsdt: string; // 마지막 충전시작일시 "",
  last_tedt: string; // 마지막 충전종료일시 "",
  now_tsdt: string; // 충전중 충전시작일시 "",
  method: string; // 충전방식 "S",
  output: number; // 충전용량 7
};

export type FindAllStationsRes = {
  result: string; // 결과 코드
  rdate: string; // 응답 기준 시간
  totalcnt: number;
  rowcnt: number; // 응답 건수
  cinfo: FindAllStationsCInfo[];
};
export type FindAllMembershipReq = {
  bid: string;
  bkey: string;
  kind: '2';
  rbid: 'CR';
  pageno: number;
  rowcnt: number;
};

export type FindAllMembershipRes = {
  result: string; // 결과 코드
  rdate: string; // 응답 기준 시간
  totalcnt: number;
  rowcnt: number; // 응답 건수
  card: [
    {
      bid: string;
      no: string;
      stop: string;
      regdate: string;
      upddate: string;
    },
  ];
};

const baseUrl = 'http://10.101.160.34';

export const KrGovEndpoints = {
  'Content-Type': 'application/x-www-form-urlencoded',
  findAllStation: {
    url: `${baseUrl}/r2/charger/info/listall`,
    body: {} as FindAllStationsReq,
  },
  findAllMembership: {
    url: `${baseUrl}/r2/card/listall`,
    body: {} as FindAllMembershipReq,
  },
  // 특정 회원카드 조회
  findOneMembership: {
    url: `${baseUrl}/r2/card/list`,
    body: {} as FindOneMembershipReq,
  },
  /**
   * 회원카드 갱신
   * 회원카드 상태가 변경되면 갱신합니다.
   * 갱신이 늦어지면, 정지 회원이 다른 사업자 충전기에서 인 증이 될 수 있습니다.
   * 회원카드 변경 정보를 10분 이내에 갱신하고, 갱신 누락을 대비해서 하루 한 번 전체 갱신을 권고합니다.
   * 한번에 2000건까지 갱신 가능합니다.
   */
  updateMembership: {
    url: `${baseUrl}/r2/card/update`,
    body: {} as UpdateMembershipReq,
  },
  /**
   * 충전 이력 등록
   * 사업자가 회원카드 인증을 통해 발생한 충전이력을 등록합니다.
   * 한번에 2000건까지 등록 가능합니다.
   * 중복된 데이터(no, sid, cid, tbid, tsdt 일치)는 여러번 전송해도 최초 1회만 등록됩니다.
   * 잘못 전 송된 데이터는 별도 관리자 화면에서 데이터를 수정하거나, 삭제 후 재전송합니다
   */
  insertRoamingCharger: {
    url: `${baseUrl}/r2/trade/regi`,
    body: {} as InsertRoamingChargerReq,
  },
};
