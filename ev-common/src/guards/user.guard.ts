import {
  Injectable,
  CanActivate,
  Logger,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
  NotImplementedException,
  NotFoundException,
} from "@nestjs/common";
import { JwtUtil } from "../utils/jwt.util";

@Injectable()
export class UserAuthGard implements CanActivate {
  private static readonly logger = new Logger(UserAuthGard.name);

  constructor(readonly jwtUtil: JwtUtil) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      UserAuthGard.logger.log(request.headers);
      const authorization = request.headers.authorization || null;
      UserAuthGard.logger.log(`Authorization: ${authorization}`);

      if (!authorization)
        throw new UnauthorizedException(
          HttpStatus.UNAUTHORIZED,
          "Token Required"
        );

      const [schema, accessToken] = authorization.split(" ");
      UserAuthGard.logger.log(`Schema: ${schema}, AccessToken: ${accessToken}`);

      if (schema.toLowerCase() !== "bearer")
        throw new NotImplementedException("Not Support Token Format");

      const payload = this.jwtUtil.userVerify(accessToken);
      UserAuthGard.logger.log(` payload: ${JSON.stringify(payload)}`);
      const userSeq = payload?.seq;

      if (!userSeq) throw new UnauthorizedException("Token Invalid");

      /*
      check User
      매번 select을 해오기보다 특정 router에서만 select해서 check하는게 좋을 듯 합니다.
      */
      // let user;
      // user = await this.userService.getOneActiveUser(payload.seq);
      // if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

      if (!payload.ok) throw new UnauthorizedException("Token Invalid");

      if (payload.exp * 1000 < Date.now())
        throw new UnauthorizedException("Token Expired");

      request["user"] = payload;

      UserAuthGard.logger.log(
        `login Token User Data: ${JSON.stringify(request.user)}`
      );

      return true;
    } catch (e) {
      UserAuthGard.logger.error(e.message);
      if (e.message === "존재하지 않는 사용자입니다.") {
        throw new NotFoundException(HttpStatus.NOT_FOUND, e.message);
      }
      throw e;
    }
  }
}
