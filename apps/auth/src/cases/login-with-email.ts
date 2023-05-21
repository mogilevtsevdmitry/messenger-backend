import { AuthHelper } from '@auth-app/services/auth.helper';
import { TokenService } from '@auth-app/services/token.service';
import { LoginWithEmailNamespace } from '@contracts/services/auth';
import { FindUserNamespace } from '@contracts/services/user';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { Tokens, User } from '@shared/interfaces';
import { Observable, mergeMap, tap } from 'rxjs';

export const loginWithEmail = (
    loginUserDto: LoginWithEmailNamespace.Request,
    client: ClientProxy,
    tokenService: TokenService,
    prisma: PrismaService,
): Observable<Tokens> => {
    return client
        .send<FindUserNamespace.Response, FindUserNamespace.Request>(FindUserNamespace.MessagePattern, {
            email: loginUserDto.email,
        })
        .pipe(
            tap((user: User) => {
                console.log(user);
                if (!user || !AuthHelper.compare(loginUserDto.password, user.password)) {
                    throw new RpcException('Не верный email или пароль');
                }
            }),
            mergeMap(async (user: User) => {
                const accessToken = tokenService.accessToken({
                    userId: user.id,
                    email: user.email,
                    roles: user.roles,
                });
                const refreshToken = tokenService.refreshToken();
                await prisma.token.create({ data: { ...refreshToken, userId: user.id } });
                return { accessToken, refreshToken };
            }),
        );
};
