import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { RolesCode } from "../enums/roles.code";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";

export function Auth(...roles: `${RolesCode}`[]) {
  return applyDecorators(
    SetMetadata("roles", roles),
    UseGuards(AuthGuard, RoleGuard)
  );
}
