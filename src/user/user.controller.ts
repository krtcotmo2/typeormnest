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
  ClassSerializerInterceptor,
  Session,
  UseGuards,
 } from '@nestjs/common';
 import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto } from './dto/user-dtos';
import { UserService } from './user.service';
import { ApiParam } from '@nestjs/swagger';
import { ScrubbedUserDto } from './dto/user-dtos';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.gaurd';

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
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @Post('/signup')
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.username,
      body.password,
      body.email,
      ).catch(err => {
        console.log(err)
        throw err;
      });
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async validateUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await  this.authService.validateUser(body).catch(err => {
      console.log(err);
      throw err;
    });
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', required: true })
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
  
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', required: true })
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @UseGuards(AuthGuard)
  @Get('/get-current-user')
  getCurrentUser(@CurrentUser() currentUser: ScrubbedUserDto) {
    return currentUser;
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async fineOne(@Param('id') id: string) {
    const user =  await this.userService.fineOne(+id);
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  

}


