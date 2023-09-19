import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService} from './auth.service';
import { Users } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user-dtos';
import * as AuthServiceModule from './auth.service';
import { Session } from 'inspector';

describe('UserController', () => {
  let controller: UserController;
  let users: Users[] = [
    {userID: 1, userName: 'kurt', userPassword: 'cooney', userEmail: 'kurt@mail.com'} as Users,
    {userID: 2, userName: 'bryan', userPassword: 'cooney', userEmail: 'bryan@mail.com'} as Users,
  ]
  // look in the controller and see all the methods that are called by the services.
  const fakeUserService: Partial<UserService> = {
    fineOne: (id: Number) => {
      const user = users.find(user => user.id === id);
      return Promise.resolve(user);
    },
    findAll: () => Promise.resolve(users),
    // delete: () => {},
    // update: () => {},
  };

  const fakeAuthService: Partial<AuthService> = {
    validateUser: async (body: CreateUserDto) => {
      const user = users.find(user => user.userName === body.userName);
      return Promise.resolve({userID: user.userID, userEmail:user.userEmail, userName: user.userName} as Users);
    },
    signup: async (username: string, password: string, email: string) => {
      return Promise.resolve({} as Users);
    }
    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {provide: UserService, useValue: fakeUserService},
        {provide: AuthService, useValue: fakeAuthService},
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find a user if id exists', async () => {
    const user = await controller.fineOne('1');
    expect(user).toStrictEqual(
      {id: 1, username: 'kurt', password: 'cooney', email: 'kurt@mail.com'}
    );
  });

  it('Throws an error if not found', async () => {
    await expect(controller.fineOne('3')).rejects.toThrow(NotFoundException);
  });

  it('finds all users', async () => {
    const user = await controller.findAll();
    expect(user.length).toBe(2);
  });

  it('Validates a user and sets session id to that users id', async ()=> {
    const session = {
      userId: undefined
    }
    const usedObject  = {
      userName: 'kurt', 
      userPassword: '12345678', 
      userEmail: 'kurt@mail.com'
    } as Users;
    const expectedUserId = users.find(user => user.userName === usedObject.userName).userID;
    const newUser = await controller.validateUser(usedObject, session);
    expect(session.userId).toBe(expectedUserId);
    expect(newUser.userEmail).toBe(expectedUserId)

  });

  it('Clears session id when the user signs out', async ()=> {
    const session = { userId: 18 };
    await controller.signOut(session);
    expect(session.userId).toBe(null);
  });
});
