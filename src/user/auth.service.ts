import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as dotenv from "dotenv";
import { scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dto/user-dtos';

const scrypt = promisify(_scrypt);

dotenv.config()
const salt =  process.env.HASH;

@Injectable()
export class AuthService {
  constructor( private userService: UserService ) {}
    
  async signup(username: string, password: string, email: string) {
      // make user username is unique
      await this.userService.searchForDuplicateUser(username, email);
      // hash password
      const hash = await (scrypt(password, salt, 32)) as Buffer;
      // return new user if unique
      const user: CreateUserDto = {
        password: hash.toString('hex'),
        username,
        email,
        age:undefined,
      }
      const newUser = await this.userService.create(user.email, user.username, user.password);
      return newUser;
    }

  async validateUser(user: CreateUserDto) {
    const hash = await (scrypt(user.password, salt, 32)) as Buffer;
    return this.userService.validateUser({
      ...user,
      password:hash.toString('hex')
    });
  }
}