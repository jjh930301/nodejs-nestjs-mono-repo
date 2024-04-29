import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiMeta, ResDataDto } from './res-data.decorator';
import * as dayjs from 'dayjs';
import { ServerResponse } from 'http';

export const Reply: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((param: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const res = ctx.switchToHttp().getResponse() as ServerResponse;

    return function (
      data: Record<'data' | 'result' | 'rows', unknown> | null,
      headers: Record<string, string> | null = null,
    ) {
      const meta: ApiMeta = {
        paging: null,
        search: null,
        timestamp: null,
      };

      const searchQuery: { search?: string } & Record<
        Exclude<string, 'search'>,
        unknown
      > = {};
      let page = 1;
      let size = 10;
      let sort_element = null;
      let sort_type = null;

      if (req.query) {
        Object.keys(req.query).forEach((key: string) => {
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
      if (data && typeof data === 'object' && 'count' in data) {
        if (
          data.count !== undefined &&
          data?.count !== null &&
          ['string', 'number'].includes(typeof data.count)
        ) {
          const { count: c } = data;
          const count = Number(c);
          let totalPage = 0;
          if (Number((count as number) % size) > 0) {
            totalPage = Math.floor(Number(+count / size + 1));
          } else {
            totalPage = Math.floor(Number(+count / size));
          }

          meta.paging.last_page_num = totalPage;
          meta.paging.total_count = count;

          delete data.count;
        }
      }

      meta.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      meta.search = searchQuery;
      if (headers) {
        Object.keys(headers).forEach((key) => {
          res.setHeader(key, headers[key]);
        });
      }
      if (param === 'file' && headers) {
        res.write(data);
        return;
      }
      let temp: unknown = data;
      if (data?.data) temp = data.data;
      if (data?.result) temp = data.result;
      if (data?.rows) temp = data.rows;

      return new ResDataDto(temp, true, null, meta);
    };
  });

export type ReplyType = <T>(data: T, headers?: unknown) => ResDataDto<T>;
