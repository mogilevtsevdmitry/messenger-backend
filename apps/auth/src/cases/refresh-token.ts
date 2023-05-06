import { TokenService } from '@auth-app/services/token.service';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { Tokens } from '@shared/interfaces';
import { User } from '@webmogilevtsev/messenger-api-dto';
import { mergeMap, Observable } from 'rxjs';

export const refreshTokens = (
    userId: string,
    client: ClientProxy,
    prisma: PrismaService,
    tokenService: TokenService,
): Observable<Tokens> => {
    return client.send<User>({ cmd: 'get-user-by-id' }, { userId }).pipe(
        mergeMap(async (user) => {
            const token = await prisma.token.findFirst({ where: { userId: user.id } });
            if (!token || new Date(token.exp) <= new Date()) {
                return null;
            }
            const refreshToken = tokenService.refreshToken();
            const accessToken = tokenService.accessToken({
                email: user.email,
                userId: user.id,
                roles: user.roles,
            });
            await prisma.token.delete({ where: { token: token.token } });
            await prisma.token.create({ data: { ...refreshToken, userId } });
            return {
                accessToken,
                refreshToken,
            };
        }),
    );
};
