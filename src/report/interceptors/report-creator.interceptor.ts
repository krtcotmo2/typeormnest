// import {
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   Injectable,
// } from '@nestjs/common';

// import { Observable, map } from 'rxjs';
// import { UserService } from '../user.service';

// //needs to be added to the modules provider
// @Injectable()
// export class CurrentUserInterceptor implements NestInterceptor {
//   constructor( private userService: UserService ) {}
//   async intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<Observable<any>>{
//     // the code  up to the return manipulates the data before the data is sent via a request
//     const request = context.switchToHttp().getRequest();
//     const {userId} = request.session || {};
//     if(userId){
//       const user  = await this.userService.fineOne(userId);
//       request.currentUser = user;
//     }

//     return handler.handle();
//   }
// }