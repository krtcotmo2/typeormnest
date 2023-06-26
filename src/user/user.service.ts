import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/user-dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>){}
  
  async searchForDuplicateUser(username: string, email: string){
    const user =  await this.repo.find({
      where: [
       {userName: username},
        {userEmail: email}
      ],
    });
    if(user.length>0){
      throw new BadRequestException('User already exists');
    }
    return user;
  }

  async findAll(){
    return await this.repo.find();
  }

  async fineOne(id: number){
    if(!id){
      throw new BadRequestException('Null Exception');;
    }
    return await this.repo.findOneBy({userID: id});
  }

  async validateUser(user: CreateUserDto){
    console.log(user.userPassword)
    const authenticatedUser =  await this.repo.findOneBy({
      userName: user.userName, 
      userPassword: user.userPassword
    });
     return authenticatedUser;
  }

  async create(email: string, username: string, password: string){
    const user = this.repo.create({userEmail: email, userPassword: password, userName: username});
    return this.repo.save(user);
  }

  async delete(id: number){
    const user = await this.fineOne(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }

  async update(id: number, attrs: Partial<Users>){
    const updatedUser = await this.repo.findOneBy({userID: id});
    if(!updatedUser){
      throw new NotFoundException('User not found');
    }
    Object.assign(updatedUser, attrs);
    return this.repo.save(updatedUser);
  }
}
