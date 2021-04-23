import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { UserModule } from '../src/user/user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          logging: false,
          synchronize: true,
        }),
        UserModule,
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register(POST) success', async () => {
    const user_dto = {
      email: 'random_email01@gmail.com',
      password: '1001',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(user_dto)
      .expect(201);
    expect(res.body).toEqual({
      access_token: expect.any(String),
    });
  });

  it('/auth/login(POST) ', async () => {
    const user_dto = {
      email: 'random_email01@gmail.com',
      password: '1001',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(201);
    expect(res.body).toEqual({
      access_token: expect.any(String),
    });

    const token = res.body.access_token;
    const res2 = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(res2.body).toEqual({
      user_id: expect.any(Number),
      email: 'random_email01@gmail.com',
    });
  });

  it('/profile(GET) no-token --> fail', async () => {
    const res = await request(app.getHttpServer()).get('/profile').expect(401);
  });

  it('/auth/login(POST) wrong email --> fail', async () => {
    const user_dto = {
      email: 'randommmmmmmmmm_email01@gmail.com',
      password: '1001',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(404); //Not found
  });

  it('/auth/login(POST) wrong pass --> fail', async () => {
    const user_dto = {
      email: 'random_email01@gmail.com',
      password: '100000000abc1',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(401); //Not authorized
  });

  it('/auth/login(POST) missing pass field --> fail', async () => {
    const user_dto = {
      email: 'random_email01@gmail.com',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(401);
  });

  it('/auth/login(POST) missing email field --> fail', async () => {
    const user_dto = {
      password: '1001',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(401);
  });
});
