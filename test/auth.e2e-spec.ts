import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a sign up request', () => {
    const username = 'randPerson';
    const email = 'random.person@comcast.net'
    return request(app.getHttpServer())
      .post('/api/user/signup')
      .send(
        {
          "email": email,
          "username": username,
          "password": "1234"
        }
      )
      .expect(201)
      .then(res => {
        const {id, username, email} =  res.body;
        expect(id).toBeDefined();
        expect(username).toBe(username);
        expect(email).toBe(email);
      });
  });

  it('Create a user then get the current logged in user', async() => {
    const username = 'randPerson';
    const email = 'random.person@comcast.net'
    
    const userResponse = await request(app.getHttpServer())
      .post('/api/user/signup')
      .send(
        {
          "email": email,
          "username": username,
          "password": "1234"
        }
      )
      .expect(201)
    
      const cookie = userResponse.get('Set-Cookie');
      const {body} = await request(app.getHttpServer())
        .get('/api/user/get-current-user')
        .set('Cookie', cookie)
        .expect(200);

      expect(body.email).toBe('random.person@comcast.net');

  });
});
