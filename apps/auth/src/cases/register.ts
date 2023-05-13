import { RegisterWithEmailNamespace } from '@contracts/services/auth';
import { FindUserNamespace } from '@contracts/services/user';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { User } from '@shared/interfaces';
import { Observable, catchError, map, mergeMap, tap } from 'rxjs';

export const register = (
    registerUserDto: RegisterWithEmailNamespace.Request,
    client: ClientProxy,
): Observable<unknown> => {
    return client.send<User>(FindUserNamespace.MessagePattern, registerUserDto.email).pipe(
        tap((user) => {
            if (user) {
                throw new RpcException(`Пользователь с email "${registerUserDto.email}" уже существует`);
            }
        }),
        mergeMap(() =>
            client.send<User>(RegisterWithEmailNamespace.MessagePattern, registerUserDto).pipe(
                map((_user) => {
                    if (!_user) {
                        throw new RpcException(
                            `Ошибка при попытке создания пользователя с данными ${JSON.stringify(registerUserDto)}`,
                        );
                    }
                    // eslint-disable @typescript-eslint/no-unused-vars
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...user } = _user;
                    return user;
                }),
            ),
        ),
        catchError((err) => {
            throw new RpcException(err);
        }),
    );
};
