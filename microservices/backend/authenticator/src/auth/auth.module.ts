import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          privateKey: configService.get('JWT_PRIVATE_KEY'),
          // process.env.NODE_ENV === 'production'
          //   ? configService.get('JWT_PRIVATE_KEY').replace(/\\n/gm, '\n')
          publicKey: configService.get('JWT_PUBLIC_KEY'),
          secret: process.env.NODE_ENV === 'test' && 'secret-key',
          signOptions: {
            expiresIn: '1h',
            issuer: 'AskMeAnything',
            algorithm: process.env.NODE_ENV !== 'test' ? 'RS256' : 'HS256',
          },
        };
        return options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]), // Allow the injection of the user repository in our service,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
