import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}
  // This is async, so it doesnt work for JWT strategy config
  async findPublicKey(): Promise<string> {
    const host = this.configService.get('AUTHENTICATOR_HOST');
    const port = this.configService.get('AUTHENTICATOR_PORT');
    const url = `http://${host}:${port}/publicKey`;
    const response = await this.httpService
      .get(url)
      .toPromise()
      .catch((err) => {
        console.log('findPublicKey', err.code);
        return err;
      });

    return response.data;
  }
}
