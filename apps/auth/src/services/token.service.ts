import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@shared/decorators';
import { RefreshToken } from '@shared/interfaces';
import { add } from 'date-fns';
import { v4 } from 'uuid';

@Injectable()
export class TokenService {
    constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {}

    accessToken(payload: UserPayload) {
        const token = this.jwt.sign(payload, { expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN', '5m') });
        return `Bearer ${token}`;
    }

    refreshToken(): RefreshToken {
        return {
            token: v4(),
            exp: add(new Date(), { months: 1 }),
        };
    }
}
