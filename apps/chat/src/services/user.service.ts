import { USER_SERVICE } from '@contracts/services/user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject(USER_SERVICE) private readonly userService: ClientProxy) {}

    currentUser = (id: string) => this.getOneUserById(id);

    private getOneUserById(id: string): Observable<User> {
        return this.userService.send('find-user', id);
    }
}
