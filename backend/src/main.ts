import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://213.171.30.54'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const options = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docks', app, document);

  await app.listen(8000);
}
bootstrap();
