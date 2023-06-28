import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtEmailVerificationStrategy extends PassportStrategy(
  Strategy,
  'jwtEmailVerification',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.cookies['REG_TOKEN'],
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    return { email };
  }
}
