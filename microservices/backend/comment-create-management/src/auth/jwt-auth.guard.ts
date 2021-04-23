import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
    Validates JWT using jwtStrategy
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
