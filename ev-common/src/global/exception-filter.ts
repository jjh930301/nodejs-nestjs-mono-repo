import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ResDataDto } from '../decorator/res-data.decorator';
import type {
  ApiError,
  ApiErrorObj,
  ApiErrorType,
} from '../decorator/res-data.decorator';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const logger = new Logger('GlobalExceptionFilter');
    logger.error(
      exception instanceof HttpException ? exception.getResponse() : exception,
    );
    logger.error(
      exception && typeof exception === 'object' && 'message' in exception
        ? exception.message
        : exception,
    );
    logger.error(
      exception && typeof exception === 'object' && 'stack' in exception
        ? exception.stack
        : exception,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const timestamp = dayjs().format();
    const path = request.url;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorObj: ApiErrorObj = {
      message: message,
      code: status,
    };
    const errorArray: ApiErrorType = [errorObj];

    const ApiErrorFromat: ApiError = {
      reqID: request.id,
      errUrl: path,
      userSeq: request.user ? request.user.userSeq : 0,
      adminSeq: request.user ? request.user.adminSeq : 0,
      errors: errorArray,
      queryParams: request.query,
      bodyParams: request.body,
    };
    const erorMeta = {
      paging: null,
      search: null,
      timestamp,
    };

    if (request.query?.search) erorMeta.search = request.query.search;

    const result = new ResDataDto(null, false, ApiErrorFromat, erorMeta);
    if (process.env.NODE_ENV === 'local')
      logger.warn({
        ...result,
      });

    response.status(status).json(result);
  }
}
