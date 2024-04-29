import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDeco } from '@ev-common/decorator/api.decorator';
import { Reply, type ReplyType } from '@ev-common/decorator/reply.decorator';
import {
  ITokenInfo,
  TokenInfo,
} from '@ev-common/decorator/token-info.decorator';
import { RolesCode } from '@ev-common/enums/roles.code';

@ApiTags('app')
@Controller()
export class AppController {
  @ApiDeco({
    operation: { summary: 'summary' },
    auth: { roles: [RolesCode.ADMIN] },
  })
  @Get()
  async getUser(@Reply() reply: ReplyType, @TokenInfo() tokenInfo: ITokenInfo) {
    return reply('data');
  }
}
