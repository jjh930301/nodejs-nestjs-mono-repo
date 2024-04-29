import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface IUserToken {
  seq: number;
  status: string;
  email: string;
  iat: number;
}

export const UserTokenInfo: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as unknown as IUserToken;
  });
