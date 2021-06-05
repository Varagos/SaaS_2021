import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { AuthModule } from '../src/auth/auth.module';
import { AppModule } from '../src/app.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          logging: false,
          synchronize: true,
        }),
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { user_id: 1, email: 'test@example.org' };
          return true;
        },
      })
      .compile();

    app = module.createNestApplication(); // Instantiate full Nest runtime env
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Register(FAIL) missing email field', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ password: '1001' })
      .expect(400);
  });

  it('Register(FAIL) missing pass field', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@test.com' })
      .expect(400);
  });

  it('/auth/register(POST) success', async () => {
    const userInstance = {
      email: 'test@example.org',
      password: '1001',
    };
    const result = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userInstance)
      .expect(201);

    expect(result.body).toEqual({
      token: expect.any(String),
      user: {
        email: 'test@example.org',
        user_id: 1,
      },
    });
  });

  it('LOGIN (SUCCESS) ', async () => {
    const user_dto = {
      email: 'test@example.org',
      password: '1001',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(201);
    expect(res.body).toEqual({
      token: expect.any(String),
      user: {
        email: 'test@example.org',
        user_id: expect.any(Number),
      },
    });

    const token = res.body.token;
    const res2 = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(res2.body).toEqual({
      user_id: res.body.user.user_id,
      email: 'test@example.org',
    });
  });

  it('LOGIN wrong email --> fail', async () => {
    const user_dto = {
      email: 'randommmmmmmmmm_email01@gmail.com',
      password: '1001',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(404); //Not found
  });

  it('Login wrong pass --> fail', async () => {
    const user_dto = {
      email: 'test@example.org',
      password: '100000000abc1',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(401); //Not authorized
  });

  it('Login(POST) missing pass field --> fail', async () => {
    const user_dto = {
      email: 'random_email01@gmail.com',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(401);
  });

  it('Login(POST) missing email field --> fail', async () => {
    const user_dto = {
      password: '1001',
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user_dto)
      .expect(401);
  });
});
