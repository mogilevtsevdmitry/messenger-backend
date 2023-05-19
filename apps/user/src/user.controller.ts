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
import { IQueryPipe } from '@shared/pipes';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern(RegisterWithEmailNamespace.MessagePattern)
    async register(data) {
        return await this.userService.create(data);
    }

    @MessagePattern(FindUsersNamespace.MessagePattern)
    async findAll(opts?: IQueryPipe) {
        return await this.userService.findAll(opts);
    }

    @MessagePattern(FindUserNamespace.MessagePattern)
    async findOne({ id }: FindUserNamespace.Request) {
        return await this.userService.findOne(id);
    }

    @MessagePattern(FindUserByEmailNamespace.MessagePattern)
    async findByEmail({ email }: FindUserByEmailNamespace.Request) {
        return await this.userService.findByEmail(email);
    }

    @MessagePattern(UpdateUserNamespace.MessagePattern)
    async updateOne(data: { userId: string; dto: any }) {
        return await this.userService.updateOne(data.userId, data.dto);
    }

    @MessagePattern(DeleteUserNamespace.MessagePattern)
    async deleteOne(id: string) {
        return await this.userService.deleteOne(id);
    }
}
