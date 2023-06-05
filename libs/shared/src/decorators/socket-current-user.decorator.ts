import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserPayload } from './current-user.decorator';

type CurrentUserType = UserPayload | Partial<UserPayload> | null;

const extractUserFromToken = (token: string): UserPayload => {
    const configService = new ConfigService();
    const jwtService = new JwtService({ secret: configService.get('JWT_ACCESS_TOKEN_SECRET') });

    return jwtService.verify<UserPayload>(token);
};

const extractToken = (socket: Socket): string => socket.handshake.headers?.authorization.split(' ')[1];

export const SocketCurrentUser = createParamDecorator(
    (data: keyof UserPayload, ctx: ExecutionContext): CurrentUserType => {
        const socket: Socket = ctx.switchToWs().getClient();
        const token = extractToken(socket);

        const user = extractUserFromToken(token);
        socket['user'] = user;

        return data ? (user[data] as Partial<UserPayload>) : (user as UserPayload);
    },
);

export const extractUserFromSocket = <T = CurrentUserType>(socket: Socket, data?: keyof UserPayload): T => {
    const user = extractUserFromToken(extractToken(socket));
    return data ? (user[data] as T) : (user as T);
};
