import { 
  Body, 
  Controller, 
  Delete, 
  Get,
  NotFoundException, 
  Param, 
  Post, 
  Put,
  Session,
  UseGuards,
 } from '@nestjs/common';
 
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto } from './dto/user-dtos';
import { UserService } from './user.service';
import { ApiParam } from '@nestjs/swagger';
import { ScrubbedUserDto } from './dto/user-dtos';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

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
        throw err;
      });
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async validateUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await  this.authService.validateUser(body).catch(err => {
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
    /* 
      because we are using the CurrentUser decorator, we get a instance of the user 
      by selecting it based off the sessionId userId 
    */
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


