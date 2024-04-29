// const logger = require(`./config/winston`)("OCPP_PROCESS");
import Flows from "./flow";
import { OCPP_FLOW_TYPE } from "./common/message";
import amqp from "amqplib";
import express from "express";
import cors from "cors";
import { DataSource, IsNull } from "typeorm";
import { options } from "@ev-common/constants/db";
import { entities } from "@ev-common/entities";
import { Manager } from "./repositories/Manager";

const app = express();
const PORT = process.env.OCPP_PROCESS_16_PORT;
const QueueSet = new Set();

app.get("/health/check", async (_req, res) => {
  return res.status(200).json({ size: QueueSet.size });
});

app.use(
  cors({
    origin: "http://localhost",
    credentials: true,
  })
);

export const AppDataSource = new DataSource({
  ...options,
  type: "mysql",
  entities: Object.values(entities).map(entity => entity),
  synchronize: false,
  // logging: true,
});

function startOcppProcessServer(runType, uuid) {
  (async () => {
    try {
      const ocppProcess = new Flows[runType](uuid);
      await ocppProcess.run();

      console.info("Server start success");
    } catch (err) {
      console.error("Server start fail: ", err);
    }
  })();
}

async function checkDbConnected() {
  try {
    await AppDataSource.initialize();
    console.info("DB Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database");
    throw err;
  }
}

export const manager = new Manager(AppDataSource.manager);

(async () => {
  await checkDbConnected();
  const channels = await manager.socketChannelsRepo.find({
    where: {
      deletedAt: IsNull(),
    },
  });
  channels.forEach(ch => {
    startOcppProcessServer(OCPP_FLOW_TYPE.Income, ch.channelId);
    startOcppProcessServer(OCPP_FLOW_TYPE.Outcome, ch.channelId);
    startOcppProcessServer(OCPP_FLOW_TYPE.OutcomeRes, ch.channelId);
    QueueSet.add(ch.channelId);
  });
})();

(async () => {
  const connection = await amqp.connect(
    `${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
  );

  const queueName = "new";
  const newChannel = await connection.createChannel();
  await newChannel.assertQueue(queueName);

  await newChannel.consume(queueName, async msg => {
    const uuid = msg?.content?.toString();
    if (uuid) {
      startOcppProcessServer("Income", uuid);
      startOcppProcessServer("Outcome", uuid);
      startOcppProcessServer("OutcomeRes", uuid);
      QueueSet.add(uuid);
      newChannel.ack(msg);
    }
  });
})();

app.listen(PORT, () => {
  console.log(`listen in ${PORT}`);
});
