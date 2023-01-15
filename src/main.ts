import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './errors';

async function bootstrap() {
  // Created main module
  const app = await NestFactory.create(AppModule);

  // All exception error filter
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  // Cookie Parser middleware
  app.use(cookieParser());

  // Use Validate
  app.useGlobalPipes(new ValidationPipe());

  // global prefix
  app.setGlobalPrefix('api');

  // Add Swagger to Project
  const config = new DocumentBuilder()
    .setTitle('My Online Platform')
    .setDescription('onlinewebedu.uz website Api')
    .setVersion('1.0.0')
    .addTag('Node.js, Nest.js, Postgres, Sequelize')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // Run Project
  const Port = process.env.PORT || 5001;

  await app.listen(Port, () => {
    console.log(`Loyiha ${Port}-portda ishga tushdi.`);
  });
}

bootstrap();
