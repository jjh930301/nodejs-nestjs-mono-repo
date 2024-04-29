import { EntityManager } from "typeorm";
import { SocketChannelsRepository } from "./SocketChannelsRepository";
import SocketChannelsEntity from "@ev-common/entities/socket.channels.entitys";
export class Manager {
  public socketChannelsRepo: SocketChannelsRepository;

  constructor(manager: EntityManager) {
    this.socketChannelsRepo = new SocketChannelsRepository(
      SocketChannelsEntity,
      manager
    );
  }
}
