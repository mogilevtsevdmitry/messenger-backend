import { TokenService } from '@auth-app/services/token.service';
import { FindUserNamespace } from '@contracts/services/user';
import { Logger, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { RefreshToken, Tokens, User } from '@shared/interfaces';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';

export const refreshTokens = (
    _refreshToken: string,
    client: ClientProxy,
    prisma: PrismaService,
    tokenService: TokenService,
): Observable<Tokens | null> => {
    return from(prisma.token.findUnique({ where: { token: _refreshToken } })).pipe(
        map((token: RefreshToken) => {
            if (!token || new Date(token.exp) <= new Date()) {
                throw new Error('Токен не найден или истек срок действия');
            }
            return token;
        }),
        mergeMap((token) =>
            client.send<FindUserNamespace.Response>(FindUserNamespace.MessagePattern, token.userId).pipe(
                mergeMap(async (user) => {
                    if (!user) {
                        throw new NotFoundException(`Пользователь с id ${token.userId} не найден`);
                    }
                    if (user instanceof HttpException) {
                        throw user;
                    }
                    const refreshToken = tokenService.refreshToken();
                    const accessToken = tokenService.accessToken({
                        email: user.email,
                        userId: user.id,
                        roles: user.roles,
                    });
                    await prisma.$transaction([
                        prisma.token.delete({ where: { token: token.token } }),
                        prisma.token.create({ data: { ...refreshToken, userId: user.id } }),
                    ]);
                    return {
                        accessToken,
                        refreshToken,
                    };
                }),
            ),
        ),
        catchError((err) => {
            Logger.error(err.message);
            return of(null);
        }),
    );
};
