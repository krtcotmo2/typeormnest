import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// due to some nest config issues you need to require instead of import
const cookieSession = require('cookie-session');


async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['sdf234'],
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  await app.listen(30003);
}
bootstrap();
