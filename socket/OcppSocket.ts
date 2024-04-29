import { WebSocketServer } from "ws";
import messageValidation from "./middlewares/messageValidation";
import dayjs from "dayjs";
import _ from "lodash";
import { type Connection, Channel } from "amqplib";

import { QueueName } from "@ev-common/constants/constant";
import SocketChannelsEntity from "@ev-common/entities/socket.channels.entitys";
import { Server } from "http";
import { DeepPartial, Repository } from "typeorm";
import { DeviceStatus as DeviceStatusEnum } from "@ev-common/enums/device.status";

const rabbitHost = String(process.env.RABBITMQ_HOST);
const rabbitPort = String(process.env.RABBITMQ_PORT);
const MESSAGE_QUEUE_EXCHANGE_NAME = {
  Incomes: "incomes",
  Outcomes: "outcomes",
};
Object.freeze(MESSAGE_QUEUE_EXCHANGE_NAME);

const wsOptions = app => {
  return {
    clientTracking: true,
    server: app,
  };
};

function wsHeartbeat() {
  clearTimeout(this.pingTimeout);
  this.pingTimeout = setTimeout(() => {
    // this.terminate();
  }, 1000 * 60);
}

type MapValue = {
  socket: WebSocket;
  code: string;
};

export class OcppSocket {
  _amqpHost: string;
  _amqpPort: string;
  _app: Server;
  _connection: Connection;
  _channel: Channel;
  _uuid: string;
  _was;
  _clientMap: Map<string, MapValue>;
  SocketChannels: Repository<SocketChannelsEntity>;

  constructor(
    connection: Connection,
    channel: Channel,
    uuid: string,
    app: Server,
    socketChannels: Repository<SocketChannelsEntity>
  ) {
    this._amqpHost = rabbitHost;
    this._amqpPort = rabbitPort;
    this._app = app;
    this._connection = connection;
    this._channel = channel;
    this._uuid = uuid;
    this._clientMap = new Map();
    this.SocketChannels = socketChannels;
  }

  bufferToJson(message) {
    try {
      let msgBody;
      if (message?.content) msgBody = message?.content?.toString();
      else msgBody = message?.toString();
      if (msgBody) {
        const trimedMsgBody = msgBody.replace(/\s|\t|\n/g, "");
        return JSON.parse(trimedMsgBody);
      }
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }

  _Comm_fault(clientKey) {
    try {
      const client = this._clientMap.get(clientKey);
      if (client) return client?.socket;
      else return client;
    } catch (e) {
      throw new Error(e);
    }
  }
  _findClientCode(clientKey) {
    try {
      const client = this._clientMap.get(clientKey);
      if (client) return client?.code;
      else return client;
    } catch (e) {
      throw new Error(e);
    }
  }
  _deleteClient(clientKey) {
    try {
      this._clientMap.delete(clientKey);
    } catch (e) {
      throw new Error(e);
    }
  }

  async _queueToWebSocketLogic(exchange, message) {
    const insertMessage = {
      socketId: "",
      code: null,
      ocppMessage: null,
    };
    let msg;
    try {
      const messageJson = this.bufferToJson(message);
      if (!messageJson) return;
      msg = messageJson.ocppMessage;
      const messageType = msg[0];

      insertMessage.socketId = messageJson.socketId;
      insertMessage.code = messageJson.code;
      insertMessage.ocppMessage = messageJson.ocppMessage;

      const validationMessage = await messageValidation(messageType, msg);
      if (validationMessage !== true) {
        console.error(msg);
      }

      // insert message logic

      const client: MapValue = this._findClient(insertMessage.socketId);
      const clientSocket = client?.socket;
      if (!_.isNil(client) && !_.isNil(clientSocket))
        this._sendMessage(clientSocket, msg);
      else {
        throw new Error("존재하지 않는 클라이언트입니다.");
      }
    } catch (e) {
      // Json 형태 변환 실패 시 메시지 무시
      console.log(e);
      console.error(e);
    }
  }

  _findClient(clientKey: string): MapValue {
    let client;
    this._clientMap.forEach((value, key, mapObject) => {
      if (key === clientKey) {
        console.log(
          `findClient findKey: ${clientKey}, key: ${key}, value: ${value}`
        );
        client = value;
        return;
      }
    });
    return client;
  }

  _sendMessage(client, jsonMsg) {
    try {
      // eslint-disable-next-line no-undef
      // client.send(Buffer.from(JSON.stringify(jsonMsg)));
      // jsonMsg = [
      //     3,
      //     jsonMsg[1],
      //     {
      //         currentTime: "2023-03-07T07:32:50Z",
      //         status: "Accepted",
      //         interval: 3000,
      //     },
      // ];
      client.send(JSON.stringify(jsonMsg));
      console.log("send message to chargepoint");
    } catch (e) {
      // amqp lib error
      throw new Error(e);
    }
  }

  _publishMessage(exchange, routeKey, jsonMsg) {
    try {
      // eslint-disable-next-line no-undef
      this._channel.publish("", routeKey, Buffer.from(JSON.stringify(jsonMsg)));
      console.log("publish message to Queue");
    } catch (e) {
      // amqp lib error
      throw new Error(e);
    }
  }

  set amqpHost(value) {
    this._amqpHost = value;
  }
  set amqpPort(value) {
    this._amqpPort = value;
  }

  async run() {
    /**
     * uuid로 queue를 생성하는 경우 새로운 인스턴스를 생성하도록 합니다.
     */
    const newChannelModel = this.SocketChannels.create({
      channelId: this._uuid,
    });
    await this.SocketChannels.save(newChannelModel);
    const newChannel = await this._connection.createChannel();
    // broadcast all new websocket Channel
    newChannel.sendToQueue("new", Buffer.from(this._uuid));
    // if (this._connection === "") {
    //     this._connection = await amqp.connect(
    //         `${rabbitHost}:${rabbitPort}`
    //     );
    //     this._channel = await this._connection.createChannel();
    // }

    this._was = new WebSocketServer(wsOptions(this._app));
    this._was.on("ping", wsHeartbeat);

    this._was.on("connection", async (socket, req) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const requestUrl = req.url.split("/");
      const socketId = req.headers["sec-websocket-key"];
      let pathParam;
      if (requestUrl.length > 1) pathParam = requestUrl[requestUrl.length - 1];
      else pathParam = requestUrl[0];

      // eslint-disable-next-line max-len
      console.log(
        `WS Connected (ip: "${ip}", socketId: "${req.headers["sec-websocket-key"]}"), pathParam: ${pathParam}`
      );
      this._clientMap.set(socketId, {
        socket: socket,
        code: pathParam,
      });
      // socket.send("WS Connected...");
      // socket.send("true");

      socket.on("message", async message => {
        const insertMessage = {
          socketId: req.headers["sec-websocket-key"],
          code: pathParam,
          ocppMessage: null,
        };
        let messageType;
        try {
          // const client = this._findClient(req.headers['sec-websocket-key']);
          const messageJson = this.bufferToJson(message);
          insertMessage.ocppMessage = messageJson;
          messageType = messageJson[0];

          // Test 중
          // insertMessage.ocppMessage[0] = 3;
          // const sendTestMessage = [3, insertMessage.ocppMessage[1],insertMessage.ocppMessage[3]]
          // this._sendMessage(socket, sendTestMessage);

          // IF Message Not validated, Logging Error
          await messageValidation(messageType, messageJson);

          // insert message logic
          const sendMessageToQueue = {
            code: insertMessage.code,
            socketId: insertMessage.socketId,
            ocppMessage: insertMessage.ocppMessage,
          };
          let exchangeName;
          let routingKey;
          if (messageType === 2) {
            exchangeName = MESSAGE_QUEUE_EXCHANGE_NAME.Incomes;
            routingKey = `${this._uuid}_${QueueName.IncomeRequest}`;
          } else if (messageType === 3 || messageType === 4) {
            exchangeName = MESSAGE_QUEUE_EXCHANGE_NAME.Outcomes;
            routingKey = `${this._uuid}_${QueueName.OutcomeResponse}`;
          }

          console.log(sendMessageToQueue);

          this._publishMessage(exchangeName, routingKey, sendMessageToQueue);
        } catch (e) {
          // Json 형태 변환 실패 시 메시지 무시
          console.log(e);
          console.error(e);
          console.error("message : " + message.toString());
        }
      });
      socket.on("close", async message => {
        const disconnectSocketKey = req.headers["sec-websocket-key"];
        // const code = this._findClientCode(disconnectSocketKey);
        // if(code) this._updateCommunicationFault(code);
        console.log("socket disconnect " + disconnectSocketKey);
        // channel_id = null
        this._deleteClient(disconnectSocketKey);
      });
      await this._channel.consume(
        `${this._uuid}_${QueueName.IncomeResponse}`,
        async message => {
          // incomeRes 는 항상 CallResult
          // let messageTypeId, uniqueId, payload;
          await this._queueToWebSocketLogic("income", message);
        },
        { noAck: true }
      );

      await this._channel.consume(
        `${this._uuid}_${QueueName.OutcomeRequest}`,
        async message => {
          await this._queueToWebSocketLogic("outcome", message);
        },
        { noAck: true }
      );
    });
  }
}
