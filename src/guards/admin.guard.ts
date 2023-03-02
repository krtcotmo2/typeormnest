import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { errorHandler } from 'src/interceptors/errorHandler';

export class AdminGuard implements CanActivate {
  // errorHandler(err: any){
  //   throw err;
  // }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if(request.currentUser  && request.currentUser.administrator){
      return true;
    }
    errorHandler(new UnauthorizedException());
  }
} 