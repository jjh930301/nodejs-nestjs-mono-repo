import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RolesCode } from "../enums/roles.code";

@Injectable()
export class RoleGuard implements CanActivate {
  private static readonly logger = new Logger(RoleGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const needRoles = this.reflector.get<`${RolesCode}`[]>(
      "roles",
      context.getHandler()
    );
    RoleGuard.logger.log(`Needs Roles: ${needRoles}`);

    if (needRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const match = [];
    for (const role of needRoles) {
      if (role === request.data.roleCode) {
        match.push(role);
      }
    }

    RoleGuard.logger.log(`Match Result Data: ${match}`);
    RoleGuard.logger.log(`Match Roles ${match.join(",")}`);

    if (!match.length)
      throw new ForbiddenException("Not Have Authority Use This API");

    return true;
  }
}
