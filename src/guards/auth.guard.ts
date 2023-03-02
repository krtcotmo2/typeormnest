import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { errorHandler } from 'src/interceptors/errorHandler';

export class AuthGuard implements CanActivate {
  // errorHandler(err: any){
  //   throw err;
  // }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if(!request.session.userId){
      errorHandler(new UnauthorizedException());
    }
    return request.session.userId;
  }
} 