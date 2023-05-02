import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, map, mergeMap, tap } from 'rxjs';

export const register = (registerUserDto: { email: string; password: string }, client: ClientProxy) => {
    return client.send({ cmd: 'get-user-by-email' }, { email: registerUserDto.email }).pipe(
        tap((user) => {
            if (user) {
                throw new RpcException(`User by email "${registerUserDto.email}" already exist`);
            }
        }),
        mergeMap(() =>
            client.send({ cmd: 'create-user' }, registerUserDto).pipe(
                map((_user) => {
                    if (!_user) {
                        throw new RpcException(`Can not create user with dto ${JSON.stringify(registerUserDto)}`);
                    }
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
