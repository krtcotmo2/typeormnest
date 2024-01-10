import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import * as dotenv from "dotenv";
import { scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { CreateUserDto, LoginUserDto } from './dto/user-dtos';
import { from, of } from 'rxjs';
import { createPassword, emailedPassword } from './auth-helper';
import { Users } from './user.entity';
import { truncate } from 'fs/promises';

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
      await this.userService.searchForDuplicateUser(email)
        .catch(err => {throw err});
      // hash password
      const hash = await (scrypt(password, salt, 32)) as Buffer;
      // return new user if unique
      const user: CreateUserDto = {
        userPassword: hash.toString('hex'),
        userName: username,
        userEmail: email,
        forcedReset: false,
      }
      const newUser = await this.userService.create(user.userEmail, user.userName, user.userPassword);
      return from(newUser);
    }

  async validateUser(user: LoginUserDto) {
    const hash = await (scrypt(user.userPassword, salt, 32)) as Buffer;
    const authenticatedUser = await this.userService.validateUser({
      ...user,
      userPassword:hash.toString('hex'),
    });
    if(!authenticatedUser){
      throw new BadRequestException('User Not Found');
    }
    if(authenticatedUser?.userPassword !== hash.toString('hex')){
      throw new BadRequestException('Invalid credentials');
    }
    return authenticatedUser;
  }

  async updatePassword(userEmail: string, newPassword: string,  forcedReset?: boolean ) {
    try{
      const user = await this.userService.findUserReset(userEmail)
        .catch(err=> {throw new Error('user_not_found')});
      await this.userService.update(user.userID, {userPassword: newPassword, forcedReset: forcedReset ?? false});
    }catch(err){
      throw err;
    }
    
  }
  async resetPassword(user: Partial<Users>){
    const userEmail = user.userEmail;
    const newPassword = createPassword();
    console.log('newPassword', newPassword)
    const hash = await (scrypt(newPassword, salt, 32)) as Buffer;

    await this.updatePassword(userEmail, hash.toString('hex'), true)
      .catch(err => {
        throw new NotFoundException('Email not found');});
    await emailedPassword(newPassword, userEmail)
  }
}

