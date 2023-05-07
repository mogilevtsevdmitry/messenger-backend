import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserPayload } from '@shared/decorators';
import { User } from '@webmogilevtsev/messenger-api-dto';
import { Observable, catchError, map, of, tap } from 'rxjs';

export const validate = (userId: string, client: ClientProxy): Observable<UserPayload | null> => {
    return client.send<User>({ cmd: 'find-user' }, userId).pipe(
        tap((data) => console.log({ data })),
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
