import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}
  // This is async, so it doesnt work for JWT strategy config
  async findPublicKey(): Promise<string> {
    const response = await this.httpService
      .get('http://localhost:5000/publicKey')
      .toPromise();
    return response.data;
  }
}
