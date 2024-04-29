import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserAuthGard } from 'src/guards/user.guard';

export function UserAuth() {
  return applyDecorators(UseGuards(UserAuthGard));
}
