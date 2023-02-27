import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR}  from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService, 
    AuthService, 
    // by adding the Interceptor in the providers this allows every route to have access to the user id of the session and has global scope
    {
      provide: APP_INTERCEPTOR, 
      useClass: CurrentUserInterceptor
    },
    /*
      Instead of wrapping  the CurrentUserInterceptor in an object we could have left it as a single Interceptor
      This way would limit the scope to just be controller level application and each controller would need to implemented into each individual controller.


      CurrentUserInterceptor
    */
  ]
})
export class UserModule {}
