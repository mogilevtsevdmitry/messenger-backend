import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserPayload } from '@shared/decorators';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    validate(payload: UserPayload) {
        console.log({ payload });

        return firstValueFrom(
            this.authService.validate(payload.userId).pipe(
                map((user) => {
                    if (!user) {
                        throw new UnauthorizedException(`Пользователь с id ${payload.userId} не найден`);
                    }
                    return user;
                }),
            ),
        );
    }
}
