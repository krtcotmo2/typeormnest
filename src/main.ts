import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// due to some nest config issues you need to require instead of import
const cookieSession = require('cookie-session');


async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  /* 
    during e2e tests we get failures because the App module skips the main.ts file
    this means we are missing the pipes and session ot the tests. 
    It is possible to take lines 22-28 and make them a separate function IE setupApp()
    Then you could call setApp passing in the parameter of app in this file and in the e2e.spec files
    
    To make them globally applied, the lines would be needed to be inserted in the App Module.
    These have been implemented globally. Pipe and session in app.Module
  */
 /*
  app.use(cookieSession({ keys: ['randomString']}));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  */
  await app.listen(30003);
}
bootstrap();
