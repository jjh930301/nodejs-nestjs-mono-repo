import SocketChannelsEntity from '@ev-common/entities/socket.channels.entitys';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SocketChannelsEntity])],
  exports: [EntityDIModule],
})
export class EntityDIModule {}
