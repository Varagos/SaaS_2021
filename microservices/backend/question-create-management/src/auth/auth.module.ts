import { HttpModule, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
