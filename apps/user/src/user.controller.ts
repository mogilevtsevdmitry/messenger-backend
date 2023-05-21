import { RegisterWithEmailNamespace } from '@contracts/services/auth';
import {
    DeleteUserNamespace,
    FindUserNamespace,
    FindUsersNamespace,
    UpdateUserNamespace,
} from '@contracts/services/user';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IQueryPipe } from '@shared/pipes';
import { ResponseMany } from '@shared/responses';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern(RegisterWithEmailNamespace.MessagePattern)
    register(user: RegisterWithEmailNamespace.Request): Promise<RegisterWithEmailNamespace.Response> {
        return this.userService.create(user);
    }

    @MessagePattern(FindUsersNamespace.MessagePattern)
    findAll(opts?: IQueryPipe): Promise<ResponseMany<FindUsersNamespace.Response>> {
        return this.userService.findAll(opts);
    }

    @MessagePattern(FindUserNamespace.MessagePattern)
    findOne(userIdOrEmail: FindUserNamespace.Request): Promise<FindUserNamespace.Response> {
        return this.userService.findOne(userIdOrEmail);
    }

    @MessagePattern(UpdateUserNamespace.MessagePattern)
    updateOne(userIdOrEmail: string, user: UpdateUserNamespace.Request): Promise<UpdateUserNamespace.Response> {
        return this.userService.updateOne(userIdOrEmail, user);
    }

    @MessagePattern(DeleteUserNamespace.MessagePattern)
    deleteOne(userIdOrEmail: string): Promise<DeleteUserNamespace.Response> {
        return this.userService.deleteOne(userIdOrEmail);
    }
}
