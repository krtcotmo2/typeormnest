import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user-dtos';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { scrypt as _scrypt} from 'crypto';


const users = [] as Users[];
describe('Auth service', () => {
  let fakeUserService: Partial<UserService>, module: TestingModule, service: AuthService
  beforeEach( async () => {
    // this fake service mocks out the responses for the functions that exist in UserService.
    // this is also limited and may need to be tweaked for each test. Better to make something a bit more realistic.
    // fakeUserService = {
    //   validateUser: (user: CreateUserDto) => Promise.resolve({ id: 1, email:'kurt@me.com', username:user.username} as User), 
    //   create: ( (email: string, username: string, password: string) => Promise.resolve({id:16, username, email} as User)),
    //   searchForDuplicateUser: ( (username: string, email: string) => Promise.resolve([])),
    // };
    
    // more realistic;
    fakeUserService = {
      create: (email: string, username: string, password: string) => {
        const user = {userID: Math.floor(Math.random() * 99999), userEmail: email, userName: username, userPassword: password} as Users;
        users.push(user);
        return Promise.resolve(user);
      },
      validateUser: (user: CreateUserDto) => {
        const validatedUser = users.find(aUser => aUser.userPassword === user.userPassword && aUser.userName === user.userName);
        return Promise.resolve(validatedUser);
      },
      searchForDuplicateUser: (username: string, email: string) => {
        const existingUser = users.filter(user => user.userName === username && user.userEmail === email) as Users[]; 
        if(existingUser.length> 0 ){
          throw new BadRequestException();
        }
        return Promise.resolve(existingUser);
      }
    }

    module = await Test.createTestingModule({
      providers: [
        AuthService, 
      // Since AuthService uses UserService we are going to "mock this service"
      {
        provide: UserService, // Now when UserServiceCalls out one of its methods it will take the useValue to define the methods
        useValue: fakeUserService // uses this mock of all methods of the service 
      }]
    }).compile();
    service = module.get(AuthService);
  })

  it('can create an instance of auth service', async() => {
    expect(service).not.toBeNull();
    expect(service).toBeDefined();
  });
  
  it('Will create the user', async() => {
    const username = 'kurt-soft';
    const email = 'kurt.cooney@softvision.com'
    const a = await service.signup(username, 'fff', email);
    expect(a.userName).toBe(username);
    expect(a.userEmail).toBe(email);
    expect(a.userID).toBeGreaterThan(0);
  })

  it('hashes the password during creation', async() => {
    //fakeUserService.create =  (email: string, username: string, password: string) => Promise.resolve({id:16, username, email, password} as User);
    const user = await service.signup('kurtHash', 'fff', 'kurtHash@softvision.com');
    expect(user.userPassword).not.toBe('fff');
    expect(user.userEmail).toBe('kurtHash@softvision.com');
    expect(user.userName).toBe('kurtHash');
  })

  it('Will prevent a user from being created if the username and email are already used', async() => {
    await service.signup('firstUser', 'fff', 'first@softvision.com');
    await expect(service.signup('firstUser', 'fff', 'first@softvision.com'))
      .rejects.toThrow(BadRequestException);
  })

  it('Will validate a user with valid password using fake service', async() => {
    // this test exposes an actual password and hashed password
    
    // fakeUserService.validateUser = (user: CreateUserDto) => Promise.resolve({ 
    //   id: 1, email:'kurt@me.com', 
    //   username:user.username, 
    //   password: 'ac7040f7ab47d61f2eeb935cd88d5fc78f71b59743b5cd0126d5424daf263c98'
    // } as User);
      
    // const username = 'krtcotmo2'
    // const validatedUser = await service.validateUser({
    //   username: username,
    //   password: '!dtiwsw111GAJO',
    //   email: undefined,
    //   age: undefined,
    // });
    // expect(validatedUser).toBeDefined();
    // expect(validatedUser.username).toBe(username)
    // expect(validatedUser.id).toBe(1)
    // expect(validatedUser.email).toBe('kurt@me.com')

    //this method creates a new user and we can get the hashed password from the result
    const username = 'kurt-c-soft';
    const thePassword = 'fff';
    const theEmail = 'kurt@me.com';
    fakeUserService.create = (email: string, username: string, password: string) => Promise.resolve({
      userID:1, 
      userName: username, 
      userEmail: email, 
      userPassword: password
    } as Users);
    fakeUserService.validateUser = (user: CreateUserDto) => Promise.resolve({ 
        userID: 1, 
        userEmail:'kurt@me.com', 
        userName:newUser.userName, 
        userPassword: newUser.userPassword
      } as Users);

    const newUser = await service.signup(username, thePassword, theEmail);
    const validatedUser = await service.validateUser({
        userName: username,
        userPassword: thePassword,
        userEmail: undefined,
      });
      expect(validatedUser).toBeDefined();
      expect(validatedUser.userName).toBe(username);
      expect(validatedUser.userID).toBe(1);
      expect(validatedUser.userEmail).toBe(theEmail)
  });

  it('Will validate a user with valid password using array of stored values', async() => {
    const username = 'kurt-c-soft';
    const thePassword = 'fff';
    const theEmail = 'kurt@me.com';
    
    await service.signup(username, thePassword, theEmail);
    const validatedUser = await service.validateUser({
        userName: username,
        userPassword: thePassword,
        userEmail: undefined,
      });
      expect(validatedUser).toBeDefined();
      expect(validatedUser.userName).toBe(username);
      expect(validatedUser.userID).toBeGreaterThan(0);
      expect(validatedUser.userEmail).toBe(theEmail)
  });

  it('Will throw error if a user is not found', async() => {
    await expect(service.validateUser({
      userName: 'krtcotmo800',
      userPassword: 'bbb',
      userEmail: undefined,
    }))
      .rejects.toThrow(BadRequestException);
    
  });

  it('Rejects user if the password is incorrect', async () => {
    const username = 'krtcotmo4';
    const email = 'krtcotmo4@gmail.com';
    const password = '234567jd'
    
    await service.signup(username, password, email);
    await expect( service.validateUser({
      userName: username ,
      userPassword: 'nothing similar',
      userEmail: undefined,
    })).rejects.toThrow(BadRequestException);
  })
})