import {
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ScrubbedUserDto } from 'src/user/dto/user-dtos';

export class SerializeInterceptor implements NestInterceptor {
constructor( private dtoPattern: any ) {}

  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any>{
    // the code  up to the return manipulates the data before the data is sent via a request
    
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(
          this.dtoPattern, 
          data, 
          {excludeExtraneousValues: true}
        );
      }),
    );
  }

}