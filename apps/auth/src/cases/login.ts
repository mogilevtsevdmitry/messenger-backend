import { AuthHelper } from '@auth-app/services/auth.helper';
import { TokenService } from '@auth-app/services/token.service';
import { BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { mergeMap, of, tap } from 'rxjs';

export const login = (
    loginUserDto: { email: string; password: string },
    client: ClientProxy,
    tokenService: TokenService,
) => {
    return client.send({ cmd: 'get-user-by-email' }, { email: loginUserDto.email }).pipe(
        tap((user) => {
            if (!user || !AuthHelper.compare(loginUserDto.password, user.password)) {
                throw new BadRequestException('Email or password not valid');
            }
        }),
        mergeMap((user) => {
            const accessToken = tokenService.accessToken({
                userId: user.id,
                email: user.email,
                roles: user.roles,
            });
            const refreshToken = tokenService.refreshToken();
            return of({ accessToken, refreshToken });
        }),
    );
};
