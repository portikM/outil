import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpRequest } from './interfaces/http-request.interface';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  validateUser(request: HttpRequest, payload: Payload): void {
    const { key } = request.body.key ? request.body : request.query;
    const { sub } = payload;
    if (!key) {
      return;
    }

    if (key !== sub) {
      throw new UnauthorizedException();
    }
  }
}
