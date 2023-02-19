import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private repo: Repository<User>){}
  
  
  async find(email: string){
    return await this.repo.findBy({email});
  }

  async findAll(){
    return await this.repo.find();
  }

  async fineOne(id: number){
    return await this.repo.findOneBy({id});
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
