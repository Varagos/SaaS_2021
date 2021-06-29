import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

/*
 on an expired JWT, the request will be denied, with a 401 Unauthorized response sent
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    const issued = new Date(payload.iat * 1000);
    const expires = new Date(payload.exp * 1000);
    return {
      user_id: payload.sub,
      email: payload.username,
      issued,
      expires,
    };
  }
}
