import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpRequest } from './interfaces/http-request.interface';
import { Payload } from './interfaces/payload.interface';

const { AUTH_SECRET = '' } = process.env;

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: AUTH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: HttpRequest, payload: Payload) {
    this.authService.validateUser(request, payload);
    return { key: payload.sub };
  }
}
