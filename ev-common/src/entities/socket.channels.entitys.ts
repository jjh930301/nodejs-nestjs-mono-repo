import { DB } from '../constants/db';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity({
  name: 'socket_channels',
  database: DB.DATABASE_NAME,
  comment: 'socket 채널 uuid',
})
export default class SocketChannelsEntity extends BaseEntity {
  @Column({
    name: 'channel_id',
    type: 'varchar',
    length: 40,
    primary: true,
    comment: 'channel_uuid',
  })
  channelId: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
  })
  deletedAt: Date;
}
