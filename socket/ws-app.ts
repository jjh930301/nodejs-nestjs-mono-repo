import { OcppSocket } from "./OcppSocket";
import { MESSAGE_QUEUE_NAME } from "@ev-common/constants/constant";
import { v4 } from "uuid";
import amqp from "amqplib";
import server from "app";
import { Channel, ChannelModel } from "amqplib/lib/channel_model";
import { DataSource, Repository } from "typeorm";
import { entities } from "@ev-common/entities";
import { options } from "@ev-common/constants/db";
import SocketChannelsEntity from "@ev-common/entities/socket.channels.entitys";

let mqConnection: ChannelModel;
let socketChannel: Channel;
const channelId = v4();
export const AppDataSource = new DataSource({
  ...options,
  type: "mysql",
  entities: Object.values(entities).map(entity => entity),
  synchronize: false,
  // logging: true,
});

const SocketChannels = new Repository(
  SocketChannelsEntity,
  AppDataSource.manager
);

/**
 *
 * 만든이 : manhee
 */
function startWebSocketProcessServer() {
  (async () => {
    try {
      await checkDbConnected().catch(err => {
        console.error("Failed to connect to database:", err);
        process.exit(1); // 연결 실패 시 프로세스 종료
      });

      mqConnection = await amqp.connect(
        `${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
      );
      socketChannel = await mqConnection.createChannel();
      await socketChannel.assertQueue(channelId);
      await socketChannel.assertQueue(
        `${channelId}_${MESSAGE_QUEUE_NAME.Outcome}`
      );
      await socketChannel.assertQueue(
        `${channelId}_${MESSAGE_QUEUE_NAME.OutcomeRequest}`
      );
      await socketChannel.assertQueue(
        `${channelId}_${MESSAGE_QUEUE_NAME.OutcomeResponse}`
      );
      await socketChannel.assertQueue(
        `${channelId}_${MESSAGE_QUEUE_NAME.IncomeRequest}`
      );
      await socketChannel.assertQueue(
        `${channelId}_${MESSAGE_QUEUE_NAME.IncomeResponse}`
      );

      const wsProcess = new OcppSocket(
        mqConnection,
        socketChannel,
        channelId,
        server,
        SocketChannels
      );
      await wsProcess.run();
    } catch (e) {
      console.error(e);
    }
  })();
}

startWebSocketProcessServer();

const PORT = process.env.SOCKET_PORT;
server.listen(PORT, () => console.info(`Server listening on ${PORT}`));

async function checkDbConnected() {
  try {
    await AppDataSource.initialize();
    console.info("DB Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database", err);
    throw err;
  }
}

const exitProcess = async () => {
  await SocketChannels.update({ channelId }, { deletedAt: new Date() });

  await socketChannel.deleteQueue(channelId);
  await socketChannel.deleteQueue(`${channelId}_${MESSAGE_QUEUE_NAME.Outcome}`);
  await socketChannel.deleteQueue(
    `${channelId}_${MESSAGE_QUEUE_NAME.OutcomeRequest}`
  );
  await socketChannel.deleteQueue(
    `${channelId}_${MESSAGE_QUEUE_NAME.OutcomeResponse}`
  );
  await socketChannel.deleteQueue(
    `${channelId}_${MESSAGE_QUEUE_NAME.IncomeRequest}`
  );
  await socketChannel.deleteQueue(
    `${channelId}_${MESSAGE_QUEUE_NAME.IncomeResponse}`
  );
  await socketChannel.close();
};

// for pm2
process.on("SIGINT", async () => {
  await exitProcess();
  server.close(err => {
    if (err) console.error(err);
    console.log("server closed on SIGINT");
    console.log("kill sigint process..");
    process.exit();
  });
});

// for nodemon
process.on("SIGUSR2", async () => {
  await exitProcess();
  server.close(err => {
    if (err) console.error(err);
    console.log("server closed on SIGUSR2");
    console.log("kill SIGUSR2 process..");
    process.exit();
  });
});

// graceful shutdown
process.on("SIGTERM", async () => {
  await exitProcess();
  server.close(err => {
    if (err) console.error(err);
    console.log("server closed on SIGTERM");
    console.log("kill sigterm process...");
    process.exit();
  });
});
