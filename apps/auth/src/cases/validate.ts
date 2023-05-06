import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, of } from 'rxjs';

export const validate = (userId: string, client: ClientProxy) => {
    return client.send({ cmd: 'get-user-by-id' }, { userId }).pipe(
        map((user) => {
            if (!user) {
                return null;
            }
            return {
                userId: user.id,
                email: user.email,
                roles: user.roles,
            };
        }),
        catchError((err) => {
            Logger.error(err, 'AUTH VALIDATE');
            return of(null);
        }),
    );
};
