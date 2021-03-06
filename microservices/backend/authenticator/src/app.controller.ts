/* eslint-disable no-unused-vars */
import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
/*
  The builtin Guard invokes the Passport strategy and kicks off the steps of validation
 */

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Get()
  greet() {
    return 'Hello traveller';
  }

  @Get('publicKey')
  async sharePK(): Promise<string> {
    const res = this.configService.get<string>('JWT_PUBLIC_KEY');
    // return JSON.parse(JSON.stringify(res));
    return res;
  }
}
