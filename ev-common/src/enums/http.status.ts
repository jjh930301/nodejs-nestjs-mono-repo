export const HttpStatus = {
  OK: {
    MSG: 'OK',
    CODE: 'OK',
    HTTP_CODE: 200,
  },
  CREATED: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 201,
  },
  ACCEPTED: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 202,
  },
  NO_CONTENT: {
    MSG: '수정/삭제할 데이터를 찾을 수 없습니다.',
    CODE: 'NO_CONTENT',
    HTTP_CODE: 204,
  },
  RESET_CONTENT: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 205,
  },
  PARTIAL_CONTENT: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 206,
  },
  BAD_REQUEST: {
    MSG: '올바르지 않은 요청 입니다.',
    CODE: 'BAD_REQUEST',
    HTTP_CODE: 400,
  },
  VALIDATE_ERROR: {
    MSG: '입력값의 정합성이 바르지 않습니다.',
    CODE: 'VALIDATE_ERROR',
    HTTP_CODE: 400,
  },
  NOT_CORRECT_STATUS: {
    MSG: '%s의 상태값이 올바르지 않습니다.',
    CODE: 'NOT_CORRECT_STATUS',
    HTTP_CODE: 400,
  },
  PARAMETER_NOT_CORRECT: {
    MSG: '파라미터 %s의 값이 올바르지 않습니다. 입력값: %s',
    CODE: 'PARAMETER_NOT_CORRECT',
    HTTP_CODE: 400,
  },
  PARAMETER_REQUIRED: {
    MSG: '파라미터 %s는 필수 항목입니다.',
    CODE: 'PARAMETER_REQUIRED',
    HTTP_CODE: 400,
  },
  DUPLICATE_DATA: {
    MSG: '이미 데이터가 존재 합니다.',
    CODE: 'DUPLICATE_DATA',
    HTTP_CODE: 409,
  },
  UNAUTHORIZED: {
    MSG: '로그인이 필요합니다.',
    CODE: 'REQUIRED_TOKEN',
    HTTP_CODE: 401,
  },
  EXPIRED_TOKEN: {
    MSG: '로그인 정보가 만료 되었습니다.',
    CODE: 'EXPIRED_TOKEN',
    HTTP_CODE: 401,
  },
  REQUIRED_TOKEN: {
    MSG: '로그인이 필요합니다.',
    CODE: 'REQUIRED_TOKEN',
    HTTP_CODE: 401,
  },
  NOT_CORRECT_LOGIN: {
    MSG: '로그인 정보가 올바르지 않습니다.',
    CODE: 'NOT_CORRECT_LOGIN',
    HTTP_CODE: 401,
  },
  NOT_CORRECT_TOKEN: {
    MSG: '로그인 유저 정보가 올바르지 않습니다.',
    CODE: 'NOT_CORRECT_TOKEN',
    HTTP_CODE: 401,
  },
  PERMISSION_DENIED: {
    MSG: '접근 불가',
    CODE: 'PERMISSION_DENIED',
    HTTP_CODE: 402,
  },
  FORBIDDEN: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 403,
  },
  NOT_FOUND: {
    MSG: '요청한 %s데이터를 찾을 수 없습니다.',
    CODE: 'NOT_FOUND_DATA',
    HTTP_CODE: 404,
  },
  METHOD_NOT_ALLOWED: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 405,
  },
  NOT_ACCEPTABLE: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 406,
  },
  REQUEST_TIMEOUT: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 408,
  },
  CONFLICT: {
    MSG: '',
    CODE: 'CONFLICT',
    HTTP_CODE: 409,
  },
  LENGTH_REQUIRED: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 411,
  },
  PAYLOAD_TOO_LARGE: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 413,
  },
  URI_TOO_LONG: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 414,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 415,
  },
  TOO_MANY_REQUESTS: {
    MSG: '요청이 너무 많습니다',
    CODE: 'TOO_MANY_REQUESTS',
    HTTP_CODE: 429,
  },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    MSG: '',
    CODE: '',
    HTTP_CODE: 431,
  },
  FILE_CHECKSUM_NOT_CORRECT: {
    MSG: '업로드된 파일의 Checksum 이 올바르지 않습니다.',
    CODE: 'FILE_CHECKSUM_NOT_CORRECT',
    HTTP_CODE: 500,
  },
  INTERNAL_SERVER_ERROR: {
    MSG: '에러 발생. 관리자에 문의 해 주세요. (ErrorID = "%s")',
    CODE: 'INTERNAL_SERVER_ERROR',
    HTTP_CODE: 500,
  },
} as const;
