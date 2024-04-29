import {
  applyDecorators,
  InternalServerErrorException,
  Logger,
  SetMetadata,
  Type,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { HttpStatus } from '../enums/http.status';

// metadata에 대한 상수 정의
// core에서만 사용되고, app layer에서는 사용되지 않음
export const RES_DATA_METADATA = 'RES_DATA_METADATA';

// 옵션 정의
export interface ResDataOptions {
  // 로깅에 필요한 함수를 받아올 수 있음
  logger?: Logger;
  pagination?: boolean;
  search?: boolean;
}

export interface ApiErrorObj {
  message: string | object;
  code: number;
}

export type ApiErrorType = [ApiErrorObj] | [];
export type CrcousPagingType = PageMeta | null;

export interface ApiError {
  reqID: string;
  errUrl?: string;
  userSeq?: number;
  adminSeq?: number;
  errors?: ApiErrorType;
  queryParams?: object;
  bodyParams?: object;
}

export class PageMeta {
  @ApiProperty()
  page: number;
  @ApiProperty()
  size: number;
  @ApiProperty()
  total_count: number;
  @ApiProperty()
  last_page_num: number;
  @ApiProperty()
  sort_element: string | null;
  @ApiProperty()
  sort_type: string | null;
}

export class ApiMeta {
  @ApiProperty({
    type: PageMeta,
  })
  paging: CrcousPagingType;
  @ApiProperty()
  search: unknown | null;
  @ApiProperty()
  timestamp: string | null;
  @ApiProperty()
  sort_element?: string | null;
  @ApiProperty()
  sort_type?: string | null;
  @ApiProperty()
  total_count?: number | null;
}

export class ResDataDto<T> {
  data: T;
  @ApiProperty({
    description: '응답 성공 여부',
  })
  isSuccess: boolean;
  @ApiProperty({
    description: '응답 에러',
  })
  error: ApiError | null;
  @ApiProperty({
    description: '응답 메타데이터',
  })
  meta: ApiMeta | null;
  constructor(
    data: T,
    succes: boolean,
    error: ApiError | null = null,
    meta: ApiMeta | null = null,
  ) {
    this.data = this.camelToSnake(data);
    this.isSuccess = succes;
    this.error = error;
    this.meta = meta;
  }

  private convert(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  private camelToSnake<K>(obj: K): K {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.camelToSnake(item)) as K;
    }

    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeCaseKey = this.convert(key);
        const value = obj[key as keyof K];

        acc[snakeCaseKey as string] = this.getValue(value);
        return acc;
      },
      {} as Record<string, unknown>,
    ) as K;
  }

  private getValue<T>(value: T) {
    if (value instanceof Date || value instanceof Buffer) {
      return value instanceof Buffer ? !!value.readInt8(0) : value;
    }

    return typeof value === 'object' ? this.camelToSnake(value) : value;
  }
}

// 데코레이터 함수 정의
export function ResData(options: ResDataOptions = {}): MethodDecorator {
  // applyDecorators는 사용하지 않아도 됨
  // 데코레이터 체이닝에 대한 가능성을 염두에 두고 작업하였음
  return applyDecorators(
    // method에 대한 metadata를 정의함
    // 나중에 `MetadataScanner`를 통해서 값을 가져옴
    SetMetadata(RES_DATA_METADATA, options),
  );
}
type Args = {
  query: Record<string, unknown>;
  params: Record<string, unknown>;
  body: Record<string, unknown>;
  headers: Record<string, unknown>;
  res: Record<'send', <T>(d: T) => T>;
} & Record<
  Exclude<string, 'query' | 'params' | 'body' | 'headers' | 'res'>,
  Record<string, unknown>
>;
export function ExResData<T>(): MethodDecorator {
  return applyDecorators(function (
    target: unknown,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: Args[]
    ): Promise<ResDataDto<T>> {
      try {
        let data = await originalMethod.apply(this, args);

        const req = {
          query: args[0].query,
          params: args[0].params,
          body: args[0].body,
          headers: args[0].headers,
        };

        const meta: ApiMeta = {
          paging: null,
          search: null,
          timestamp: null,
        };

        type SearchQuery = { [key: string]: unknown } & Record<
          Exclude<string, 'search'>,
          unknown
        >;
        const searchQuery: SearchQuery = {};
        let page = 1;
        let size = 10;
        let sort_element = null;
        let sort_type = null;

        if (req.query as Record<string, unknown>) {
          Object.keys(req.query).forEach((key) => {
            switch (key) {
              case 'keyword':
                searchQuery['search'] = req.query[key];
                break;
              case 'page':
                page = Number(req.query[key]) || 0;
                break;
              case 'size':
                size = Number(req.query[key]) || 0;
                break;
              case 'sort_element':
                sort_element = req.query[key];
                break;
              case 'sort_type':
                sort_type = req.query[key];
                break;
              default:
                searchQuery[key] = req.query[key];
                break;
            }
          });
        }

        meta.paging = {
          page: page,
          size: size,
          total_count: 0,
          last_page_num: 0,
          sort_element,
          sort_type,
        };

        if (data?.count !== undefined && data?.count !== null) {
          const { count } = data;
          let totalPage = 0;
          if (Number(count % size) > 0) {
            totalPage = Math.floor(Number(count / size + 1));
          } else {
            totalPage = Math.floor(Number(count / size));
          }

          meta.paging.last_page_num = totalPage;
          meta.paging.total_count = count;

          delete data.count;
        }

        meta.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        meta.search = searchQuery;

        if (data?.data) data = data.data;

        const resData = new ResDataDto<T>(data, true, null, meta);

        return args[0].res.send(resData);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          e.message,
        );
      }
    };

    return descriptor;
  });
}

export const ApiResDataRespones = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  args?: {
    description?: string;
    status?: number;
  },
  isArray: boolean | null = false,
) => {
  const { status, description } = args || { status: 200, description: 'OK' };
  const properties = {
    data: isArray
      ? {
          description,
          items: { $ref: getSchemaPath(dataDto) },
        }
      : { $ref: getSchemaPath(dataDto) },
  };
  const responseDeco = function () {
    switch (status) {
      case 200:
        return ApiOkResponse({
          schema: {
            type: 'object',
            format: 'object',
            allOf: [
              { $ref: getSchemaPath(ResDataDto<typeof dataDto>) },
              {
                properties,
              },
            ],
          },
        });
      case 201:
        return ApiCreatedResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(ResDataDto<typeof dataDto>) },
              {
                properties,
              },
            ],
          },
        });
    }
  };

  return {
    ext: ApiExtraModels(ResDataDto<typeof dataDto>, dataDto),
    res: responseDeco(),
  };
};
