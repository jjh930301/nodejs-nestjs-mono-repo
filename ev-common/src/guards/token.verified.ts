import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { HttpStatus } from "../enums/http.status";
import { JwtUtil } from "../utils/jwt.util";
import { getAccessToken } from "../utils/util";

@Injectable()
export class TokenVerified implements CanActivate {
  constructor(private readonly jwtUtil: JwtUtil) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = getAccessToken(req);
    if (!token) throw new UnauthorizedException(HttpStatus.REQUIRED_TOKEN);
    req.data = {
      ...req.data,
      tokenInfo: this.jwtUtil.verify(token),
    };

    return true;
  }
}
