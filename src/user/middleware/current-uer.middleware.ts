import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../user.service";
import { Users } from "../user.entity";


declare global{
  namespace Express{
    interface Request{
      currentUser?: Users;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService){}
  async use(req: Request, res: Response, next: NextFunction) {
    const {userId} = req.session || {};
    if(userId){
      const user = await this.userService.fineOne(+userId);
      req.currentUser = user;
    }
    next();
  }
}

