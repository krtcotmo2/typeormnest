import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './report/report.entity';
import { ReportModule } from './report/report.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    UserModule, 
    ReportModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        }
      },
    }), 
    // TypeOrmModule.forRoot({
      //   type: 'sqlite',
      //   database: 'db.sqlite',
      //   entities: [User, Report],
      //   synchronize: true,
      // })
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
  // THIS BECOMES  A GLOBAL MIDDLEWARE
  export class AppModule {
    constructor(private config: ConfigService){}

    configure(consumer: MiddlewareConsumer){
      consumer.apply(
        cookieSession({ keys: [this.config.get<string>('COOKIE_KEY')] }) 
        ) 
        .forRoutes('*');
      }
    }