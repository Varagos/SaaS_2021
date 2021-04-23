import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    // Throw exception and let exceptions layer handle it
    if (!user) {
      throw new UnauthorizedException();
    }
    /*
        User is returned so Passport can complete
        its tasks( e.g. creat user in Request Object)
     */
    return user;
  }
}
