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

  it('/user(GET) initially empty', async () => {
    return request(app.getHttpServer()).get('/user').expect(200).expect([]);
  });

  it('/user(POST) Succeeds', async () => {
    const user_dto = {
      email: 'random_email01@gmail.com',
      password: '1001',
    };
    const result = await request(app.getHttpServer())
      .post('/user')
      .send(user_dto)
      .expect(201);
    expect(result.body).toEqual({
      user_id: 1,
      email: 'random_email01@gmail.com',
      password: '1001',
    });
  });
});
