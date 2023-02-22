import  {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'

// A decorator can not get access to the user service since it is part of the dependency injection
// and the decorator is not.
// WE need to use an interceptor to add the "currentUser" prop to the  request.
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
);