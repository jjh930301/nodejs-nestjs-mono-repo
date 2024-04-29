import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './setup.swagger';
import { SnakeToCamelPipe } from '@ev-common/global/snake-to-camel-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (['local', 'development'].includes(process.env.NODE_ENV)) {
    app.enableCors({ allowedHeaders: '*', origin: '*' });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new SnakeToCamelPipe());
  setupSwagger(app);
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
