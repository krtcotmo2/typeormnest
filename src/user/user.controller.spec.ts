import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService} from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user-dtos';
import * as AuthServiceModule from './auth.service';
import { Session } from 'inspector';

describe('UserController', () => {
  let controller: UserController;
  let users: User[] = [
    {id: 1, username: 'kurt', password: 'cooney', email: 'kurt@mail.com'} as User,
    {id: 2, username: 'bryan', password: 'cooney', email: 'bryan@mail.com'} as User,
  ]
  // look in the controller and see all teh methods that are called by the services.
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
      const user = users.find(user => user.username === body.username);
      return Promise.resolve({id: user.id, email:user.email, username: user.username} as User);
    },
    signup: async (username: string, password: string, email: string) => {
      return Promise.resolve({} as User);
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
      username: 'kurt', 
      password: '12345678', 
      email: 'kurt@mail.com'
    } as User;
    const expectedUserId = users.find(user => user.username === usedObject.username).id;
    const newUser = await controller.validateUser(usedObject, session);
    expect(session.userId).toBe(expectedUserId);
    expect(newUser.id).toBe(expectedUserId)

  });

  it('Clears session id when the user signs out', async ()=> {
    const session = { userId: 18 };
    await controller.signOut(session);
    expect(session.userId).toBe(null);
  });
});
