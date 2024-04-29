import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('nodejs nestjs mono repo')
    .setDescription(``)
    .addBearerAuth(
      { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .addBearerAuth(
      { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'user Authorization',
    );

  // if (env.NODE_ENV === 'development') options.addServer('/api');

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('docs', app, document);
};
