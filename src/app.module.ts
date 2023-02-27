import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './report/report.entity';
import { ReportModule } from './report/report.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    UserModule, 
    ReportModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // this is a global pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true}),
    },
  ],
})
// this is where the session is applied globally
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      cookieSession({ keys: ['sdf234'] }) 
    ) 
    .forRoutes('*');
  }
}
