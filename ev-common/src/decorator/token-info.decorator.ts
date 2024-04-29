import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface ITokenInfo {
  ok: boolean;
  seq: number;
  roleCode: string;
  adminCpoSeqs: number[];
  token: string;
  iat: number;
  exp: number;
}

export const TokenInfo: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.data as unknown as ITokenInfo;
  });
