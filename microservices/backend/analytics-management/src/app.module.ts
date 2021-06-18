import { HttpModule, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { CommentModule } from './comment/comment.module';
import { KeywordModule } from './keyword/keyword.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'), //?.host and ?.port override this
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        ssl: {
          rejectUnauthorized: false,
        },
        logging: true,
        synchronize: true,
        migrations: ['dist/migration/*{.ts,.js}'],
        cli: {
          migrationsDir: 'migration',
        },
      }),
      inject: [ConfigService],
    }),
    QuestionModule,
    CommentModule,
    KeywordModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
