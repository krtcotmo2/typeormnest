import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { plainToClass } from 'class-transformer';

// constructor that ensures that the argument of the serialize is a class
interface ClassConstructor{
  new (...args: any[]): {}
}

// ClassSerializerInterceptor are universal blockers of data and we use it to block passing password
  // Custom interceptors allow for certain data to pass under certain conditions. IE age column
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

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