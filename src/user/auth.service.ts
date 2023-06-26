import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as dotenv from "dotenv";
import { scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dto/user-dtos';

const scrypt = promisify(_scrypt);

dotenv.config(
  {path: `.env.${process.env.NODE_ENV}`}
);

const salt =  process.env.SALT;

@Injectable()
export class AuthService {
  constructor( private userService: UserService ) {}
    
  async signup(username: string, password: string, email: string) {
      // make user username is unique
      await this.userService.searchForDuplicateUser(username, email)
        .catch(err => {throw err});
      // hash password
      const hash = await (scrypt(password, salt, 32)) as Buffer;
      // return new user if unique
      const user: CreateUserDto = {
        userPassword: hash.toString('hex'),
        userName: username,
        userEmail: email,
      }
      const newUser = await this.userService.create(user.userEmail, user.userName, user.userPassword);
      return newUser;
    }

  async validateUser(user: CreateUserDto) {
    const hash = await (scrypt(user.userPassword, salt, 32)) as Buffer;
    const authenticatedUser = await this.userService.validateUser({
      ...user,
      userPassword:hash.toString('hex')
    });
    if(!authenticatedUser){
      throw new BadRequestException('User Not Found');
    }
    if(authenticatedUser?.userPassword !== hash.toString('hex')){
      throw new BadRequestException('Invalid credentials');
    }
    return authenticatedUser;
  }
}