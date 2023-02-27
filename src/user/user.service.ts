import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user-dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}
  
  async searchForDuplicateUser(username: string, email: string){
    const user =  await this.repo.find({
      where: [
       {username},
        {email}
      ],
    });
    if(user.length>0){
      console.log('throwing')
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
    return await this.repo.findOneBy({id});
  }

  async validateUser(user: CreateUserDto){
    const authenticatedUser =  await this.repo.findOneBy({
      username: user.username, 
      password: user.password
    });
     return authenticatedUser;
  }

  async create(email: string, username: string, password: string){
    const user = this.repo.create({email, password, username});
    return this.repo.save(user);
  }

  async delete(id: number){
    const user = await this.fineOne(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }

  async update(id: number, attrs: Partial<User>){
    const updatedUser = await this.repo.findOneBy({id});
    if(!updatedUser){
      throw new NotFoundException('User not found');
    }
    Object.assign(updatedUser, attrs);
    return this.repo.save(updatedUser);
  }
}
