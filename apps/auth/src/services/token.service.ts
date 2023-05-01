import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';
import { v4 } from 'uuid';

@Injectable()
export class TokenService {
    constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {}

    accessToken(payload) {
        return this.jwt.sign(payload, { expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') });
    }

    refreshToken() {
        return {
            token: v4(),
            exp: add(new Date(), { months: 1 }),
        };
    }
}
