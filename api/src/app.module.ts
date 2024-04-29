import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from '@ev-common/constants/db';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RouterModule, Routes } from '@nestjs/core';
import { entities } from '@ev-common/entities';
import { AppController } from './app.controller';
import { JwtUtil } from '@ev-common/utils/jwt.util';

const routes: Routes = [];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
      type: 'mysql',
      charset: 'utf8mb4',
      autoLoadEntities: true,
      synchronize: true,
      entities: Object.values(entities).map((entity) => entity),
      logging: false,
      subscribers: [],
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: `${process.env.RABBITMQ_HOST}`,
    }),
    RouterModule.register(
      process.env.NODE_ENV === 'production'
        ? routes
        : [
            {
              path: 'api',
              children: [
                {
                  path: 'v1',
                  children: routes,
                },
              ],
            },
          ],
    ),
  ],
  controllers: [AppController],
  providers: [JwtUtil],
})
export class AppModule {}
