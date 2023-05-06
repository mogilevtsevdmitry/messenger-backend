import { AuthHelper } from '@auth-app/services/auth.helper';
import { TokenService } from '@auth-app/services/token.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginEmail } from '@webmogilevtsev/messenger-api-dto';
import { mergeMap, of, tap } from 'rxjs';

export const login = (loginUserDto: LoginEmail.RequestBody, client: ClientProxy, tokenService: TokenService) => {
    return client.send({ cmd: 'get-user-by-email' }, { email: loginUserDto.email }).pipe(
        tap((user) => {
            if (!user || !AuthHelper.compare(loginUserDto.password, user.password)) {
                throw new RpcException('Не верный email или пароль');
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
