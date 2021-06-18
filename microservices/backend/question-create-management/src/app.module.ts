import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './question/question.module';
import { KeywordModule } from './keyword/keyword.module';
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
        synchronize: false,
        migrations: ['dist/migration/*{.ts,.js}'],
        cli: {
          migrationsDir: 'migration',
        },
      }),
      inject: [ConfigService],
    }),
    QuestionModule,
    KeywordModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
