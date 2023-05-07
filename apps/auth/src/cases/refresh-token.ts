import { TokenService } from '@auth-app/services/token.service';
import { Logger, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { Tokens } from '@shared/interfaces';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';

export const refreshTokens = (
    _refreshToken: string,
    client: ClientProxy,
    prisma: PrismaService,
    tokenService: TokenService,
): Observable<Tokens | null> => {
    return from(prisma.token.findUnique({ where: { token: _refreshToken } })).pipe(
        map((token) => {
            if (!token || new Date(token.exp) <= new Date()) {
                throw new Error('Токен не найден или истек срок действия');
            }
            return token;
        }),
        mergeMap((token) =>
            client.send({ cmd: 'find-user' }, token.userId).pipe(
                mergeMap(async (user) => {
                    if (!user) {
                        throw new NotFoundException(`Пользователь с id ${token.userId} не найден`);
                    }
                    const refreshToken = tokenService.refreshToken();
                    const accessToken = tokenService.accessToken({
                        email: user.email,
                        userId: user.id,
                        roles: user.roles,
                    });
                    await prisma.token.delete({ where: { token: token.token } });
                    await prisma.token.create({ data: { ...refreshToken, userId: user.id } });
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
