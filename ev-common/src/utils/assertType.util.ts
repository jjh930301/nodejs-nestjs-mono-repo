import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Provider,
} from '@nestjs/common';
import { HttpStatus } from '../enums/http.status';
import { z } from 'zod';

@Injectable()
export class AssertTypeUtil {
  assertEnum<T>(e: T, v: unknown): asserts v is T[keyof T] {
    const r = z.nativeEnum(e as z.EnumLike).safeParse(v);
    if (r.success === false) {
      throw new InternalServerErrorException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Invalid enum value: ${r.error.message}`,
      );
    }
  }

  private assertEnumArray<T extends object>(
    e: T,
    v: unknown,
  ): asserts v is T[keyof T] {
    const r = Object.values(e as object).includes(v);
    if (!r) {
      throw new Error('Invalid enum value');
    }
  }

  assertEnumHttp<T>(e: T, v: unknown): asserts v is T[keyof T] {
    const r = z.nativeEnum(e as z.EnumLike).safeParse(v);
    if (r.success === false) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        `Invalid enum value: ${r.error.message}`,
      );
    }
  }
}

export const AssertTypeUtilProvier: Provider = {
  provide: AssertTypeUtil,
  useFactory: () => new AssertTypeUtil(),
};
