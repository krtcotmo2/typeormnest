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
import { from, map, of } from 'rxjs';
import { Users } from './user.entity';
import { scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
const salt =  process.env.SALT;

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
      body.userName,
      body.userPassword,
      body.userEmail,
      ).catch(err => {
        throw err;
      });
    return user;
  }

  @Post('/login')
  async validateUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await  this.authService.validateUser(body).catch(err => {
      throw err;
    });
    session.userId = user.userID;
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
  
  @ApiParam({ name: 'id', required: true })
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() body) {
   
      const hash = await (scrypt(body.userPassword, salt, 32)) as Buffer;
      body.userPassword = hash.toString('hex');
    
    return this.userService.update(+id, {...body.user,userPassword: body.userPassword, forcedReset: false});
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

  @Post('/resetPassword')
  @Serialize(Users)
  async resetPassword(@Body() body: Partial<Users>) {
    return this.authService.resetPassword(body)
      .catch(err => {throw err});
  }

  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  

}


