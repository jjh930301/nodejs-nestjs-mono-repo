import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
  ForbiddenException,
  mixin,
} from '@nestjs/common';
import { HttpStatus } from '../enums/http.status';
import { JwtUtil } from '../utils/jwt.util';

/**
 * @param flag
 * flag값은 query string에 business_seq가 들어왔을 때
 * token에 담긴 adminCpoSeqs[]에서 해당하는 값이 있는지 찾고 없으면 forbidden
 */
export const AuthGuard = (flag: boolean | null = null) => {
  @Injectable()
  class Auth implements CanActivate {
    private static readonly logger = new Logger(Auth.name);

    constructor(readonly jwtUtil: JwtUtil) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        Auth.logger.log(request.headers);
        Auth.logger.log(request.payload);
        const authorization = request.headers.authorization || null;
        Auth.logger.log(`Authorization: ${authorization}`);

        if (!authorization)
          throw new UnauthorizedException(HttpStatus.REQUIRED_TOKEN);

        const [schema, accessToken] = authorization.split(' ');
        Auth.logger.log(`Schema: ${schema}, AccessToken: ${accessToken}`);

        if (schema.toLowerCase() !== 'bearer')
          throw new NotImplementedException('Not Support Token Format');

        const payload = this.jwtUtil.verify(accessToken);
        Auth.logger.log(` payload: ${JSON.stringify(payload)}`);
        if (flag) {
          if (
            !payload.adminCpoSeqs.find(
              (seq: number) => seq === Number(request.query.cpo_seq),
            ) &&
            request.query.cpo_seq
          )
            throw new ForbiddenException(HttpStatus.FORBIDDEN);
        }
        if (!payload.ok) throw new UnauthorizedException('Token Invalid');

        if (payload.exp * 1000 < Date.now())
          throw new UnauthorizedException('Token Expired');

        Auth.logger.log(` roleCode: ${payload.roleCode}`);

        payload.roleCode = payload.roleCode.toUpperCase();
        request['data'] = payload;

        Auth.logger.log(
          `login Token User Data: ${JSON.stringify(request.data)}`,
        );
        return true;
      } catch (e) {
        Auth.logger.error(e.message);
        if (e.message === '존재하지 않는 사용자입니다.') {
          throw new NotFoundException(HttpStatus.NOT_FOUND, e.message);
        }
        throw e;
      }
    }
  }
  const guard = mixin(Auth);
  return guard;
};
