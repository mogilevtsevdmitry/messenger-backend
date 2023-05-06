import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterWithEmailDto } from '@webmogilevtsev/messenger-api-dto';
import { catchError, map, mergeMap, tap } from 'rxjs';

export const register = (registerUserDto: RegisterWithEmailDto, client: ClientProxy) => {
    return client.send({ cmd: 'get-user-by-email' }, { email: registerUserDto.email }).pipe(
        tap((user) => {
            if (user) {
                throw new RpcException(`Пользователь с email "${registerUserDto.email}" уже существует`);
            }
        }),
        mergeMap(() =>
            client.send({ cmd: 'create-user' }, registerUserDto).pipe(
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
