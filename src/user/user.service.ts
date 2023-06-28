import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { CreateUserDto, LoginUserDto } from './dto/user-dtos';
import { AppDataSource } from 'src/app-data-source';
import { from } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) 
    private repo: Repository<Users>
  ){}
  
  async searchForDuplicateUser(email: string){
    const user =  await AppDataSource.manager.find(Users, {
      where: [
        {userEmail: email}
      ],
    });
    if(user.length>0){
      throw new BadRequestException('User already exists');
    }
    return user;
  }

  async findAll(){
    return await AppDataSource.manager.find(Users);
  }

  async fineOne(id: number){
    if(!id){
      throw new BadRequestException('Null Exception');;
    }
    return await AppDataSource.manager.findOneBy(Users, {userID: id});
  }

  async fineUserReset(email: string){
    if(!email){
      throw new BadRequestException('Null Exception');;
    }
    return await AppDataSource.manager.findOneBy(Users, {userEmail: email});
  }

  async validateUser(user: LoginUserDto){
    console.log(user.userEmail, user.userPassword)
    const authenticatedUser =  await AppDataSource.manager.findOneBy(Users, {
      userEmail: user.userEmail, 
      userPassword: user.userPassword
    });
     return authenticatedUser;
  }

  async create(email: string, username: string, password: string){
    const user = await AppDataSource.manager.create(Users, {userEmail: email, userPassword: password, userName: username});
    return from(AppDataSource.manager.save(Users,user))
  }

  async delete(id: number){
    const user = await this.fineOne(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return AppDataSource.manager.remove(Users, user);
  }

  async update(id: number, attrs: Partial<Users>){
    const updatedUser = await AppDataSource.manager.findOneBy(Users, {userID: id});
    if(!updatedUser){
      throw new NotFoundException('User not found');
    }
    Object.assign(updatedUser, attrs);
    return AppDataSource.manager.save(Users, updatedUser);
  }
}
