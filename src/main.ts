import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middleware/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // middleware validation field trong body of request

  // define thông tin cơ bản của swagger
  const config = new DocumentBuilder()
    .setTitle('Capstone NODE38') // đặt tên cho swagger
    .addBearerAuth()
    .setDescription('Đây là list API về Youtube')
    .setVersion('1.0') // version đầu tiên
    .build(); // build swagger

  // apply swagger cho NestJS
  const swagger = SwaggerModule.createDocument(app, config);

  // setup swagger với đường dẫn là /swagger
  SwaggerModule.setup('swagger', app, swagger);

  // app.use(loggerMiddleware); // middleware cho toàn bộ API
  await app.listen(3000);
}
bootstrap();
// npm i @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt
