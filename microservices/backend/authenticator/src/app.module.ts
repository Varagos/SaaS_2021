import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'rxjs';

@Module({
  imports: [
    UserModule,
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
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Environment key/value pairs are parsed and resolved
  ],
  controllers: [AppController],
})
export class AppModule {}
