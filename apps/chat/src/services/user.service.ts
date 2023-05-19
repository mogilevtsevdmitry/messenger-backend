import { FindUserNamespace, USER_SERVICE, UpdateUserNamespace } from '@contracts/services/user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject(USER_SERVICE) private readonly userService: ClientProxy) {}

    currentUser = (id: string) => this.getOneUserById(id);
    setSocketIdToUser = (id: string, socketId: string) => this._setSocketIdToUser(id, socketId);

    private getOneUserById(id: string): Observable<User> {
        return this.userService.send<FindUserNamespace.Response, FindUserNamespace.Request>(
            FindUserNamespace.MessagePattern,
            { id },
        );
    }

    private _setSocketIdToUser(id: string, socketId: string): Observable<User> {
        return this.userService.send<UpdateUserNamespace.Response, UpdateUserNamespace.Request>(
            UpdateUserNamespace.MessagePattern,
            { id, socketId, isOnline: true },
        );
    }
}
