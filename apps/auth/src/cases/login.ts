import { AuthHelper } from '@auth-app/services/auth.helper'
import { TokenService } from '@auth-app/services/token.service'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { mergeMap, of, tap } from 'rxjs'

export const login = (
	loginUserDto: { email: string; password: string },
	client: ClientProxy,
	tokenService: TokenService
) => {
<<<<<<< HEAD
	return client
		.send({ cmd: 'get-user-by-email' }, { email: loginUserDto.email })
		.pipe(
			tap((user) => {
				if (
					!user ||
					!AuthHelper.compare(loginUserDto.password, user.password)
				) {
					throw new RpcException('Email or password not valid')
				}
			}),
			mergeMap((user) => {
				const accessToken = tokenService.accessToken({
					userId: user.id,
					email: user.email,
					roles: user.roles,
				})
				const refreshToken = tokenService.refreshToken()
				return of({ accessToken, refreshToken })
			})
		)
}
=======
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
>>>>>>> master
