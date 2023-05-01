import { BadRequestException, ConflictException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, mergeMap, tap } from 'rxjs';

export const register = (registerUserDto: { email: string }, client: ClientProxy) => {
    return client.send({ cmd: 'get-user-by-email' }, { email: registerUserDto.email }).pipe(
        tap((user) => {
            if (user) {
                throw new ConflictException(`User by email "${registerUserDto.email}" already exist`);
            }
        }),
        mergeMap((dto) =>
            client.send({ cmd: 'create-user' }, { user: dto }).pipe(
                map((_user) => {
                    if (!_user) {
                        throw new BadRequestException();
                    }
                    const { password, ...user } = _user;
                    return user;
                }),
            ),
        ),
        catchError((err) => {
            throw new BadRequestException(err);
        }),
    );
};
