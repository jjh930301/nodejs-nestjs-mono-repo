export class ProcessType {
  _amqpHost;
  _amqpPort;
  _connection;
  _channel;
  constructor() {
    this._amqpHost = process.env.RABBITMQ_HOST;
    this._amqpPort = process.env.RABBITMQ_PORT;
    this._connection;
    this._channel;
  }

  makeRandomValue16() {
    let number = "";
    for (let i = 0; i < 16; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }

  async publishMessage(exchange, routeKey, jsonMsg) {
    try {
      this._channel.publish(
        exchange,
        routeKey,
        Buffer.from(JSON.stringify(jsonMsg))
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
