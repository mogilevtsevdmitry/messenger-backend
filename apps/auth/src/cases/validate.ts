import { FindUserNamespace } from '@contracts/services/user';
import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserPayload } from '@shared/decorators';
import { Observable, catchError, map, of } from 'rxjs';

export const validate = (userId: string, client: ClientProxy): Observable<UserPayload | null> => {
    return client
        .send<UserPayload, FindUserNamespace.Request>(FindUserNamespace.MessagePattern, {
            userId,
        })
        .pipe(
            map((user) => {
                if (!user) {
                    return null;
                }
                return {
                    userId: user.userId,
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
