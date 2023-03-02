import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middleware/current-uer.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService, 
    AuthService, 
    // by adding the Interceptor in the providers this allows every route to have access to the user id of the session and has global scope
    // It does nto however get called before guards which can cause problems so a middleware can be better
    // {
    //   provide: APP_INTERCEPTOR, 
    //   useClass: CurrentUserInterceptor
    // },
    /*
      Instead of wrapping  the CurrentUserInterceptor in an object we could have left it as a single Interceptor
      This way would limit the scope to just be controller level application and each controller would need to implemented into each individual controller.

      CurrentUserInterceptor
    */
  ]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
