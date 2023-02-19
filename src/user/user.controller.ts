import { 
  Body, 
  Controller, 
  Delete, 
  Get,
  NotFoundException, 
  Param, 
  Post, 
  Put,
  UseInterceptors,
  ClassSerializerInterceptor
 } from '@nestjs/common';
 import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto } from './dto/user-dtos';
import { UserService } from './user.service';
import { ApiParam } from '@nestjs/swagger';
import { ScrubbedUserDto } from './dto/user-dtos';

// constructor that ensures that the argument of the serialize is a class
interface ClassConstructor{
  new (...arg: any[]): {}
}

// ClassSerializerInterceptor are universal blockers of data and we use it to block passing password
  // Custom interceptors allow for certain data to pass under certain conditions. IE age column
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(ClassSerializerInterceptor, new SerializeInterceptor(dto));
}

@Controller('/api/user')
@Serialize(ScrubbedUserDto)    // can also be applied to each route
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async fineOne(@Param('id') id: string) {
    const user =  await this.userService.fineOne(+id);
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(
      body.email,
      body.username,
      body.password
    ).catch(arg => console.log(arg));
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
  
  @ApiParam({ name: 'id', required: true })
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }
}


