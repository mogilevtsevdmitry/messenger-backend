import { RegisterWithEmailNamespace } from '@contracts/services/auth';
import {
    DeleteUserNamespace,
    FindUserNamespace,
    FindUsersNamespace,
    UpdateUserNamespace,
} from '@contracts/services/user';
import { FindUserByEmailNamespace } from '@contracts/services/user/methods/find-user-by-email';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '@shared/interfaces';
import { IQueryPipe } from '@shared/pipes';
import { ResponseMany } from '@shared/responses';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern(RegisterWithEmailNamespace.MessagePattern)
    register(data: RegisterWithEmailNamespace.Request): Promise<User> {
        return this.userService.create(data);
    }

    @MessagePattern(FindUsersNamespace.MessagePattern)
    findAll(opts?: IQueryPipe): Promise<ResponseMany<User>> {
        return this.userService.findAll(opts);
    }

    @MessagePattern(FindUserNamespace.MessagePattern)
    findOne({ id }: Pick<FindUserNamespace.Request, 'id'>): Promise<User> {
        return this.userService.findOne(id);
    }

    @MessagePattern(FindUserByEmailNamespace.MessagePattern)
    findByEmail({ email }: FindUserByEmailNamespace.Request): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @MessagePattern(UpdateUserNamespace.MessagePattern)
    updateOne({ id }: Pick<FindUserNamespace.Request, 'id'>, user: User) {
        return this.userService.updateOne(id, user);
    }

    @MessagePattern(DeleteUserNamespace.MessagePattern)
    deleteOne({ id }: Pick<FindUserNamespace.Request, 'id'>): Promise<User> {
        return this.userService.deleteOne(id);
    }
}
