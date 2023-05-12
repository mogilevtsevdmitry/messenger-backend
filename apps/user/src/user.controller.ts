import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QueryDto } from '@shared/pipes';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'register-with-email' })
    async register(dto) {
        return await this.userService.create(dto);
    }

    @MessagePattern({ cmd: 'find-users' })
    async findAll(opts?: QueryDto) {
        return await this.userService.findAll(opts);
    }

    @MessagePattern({ cmd: 'find-user' })
    async findOne(id: string) {
        return await this.userService.findOne(id);
    }

    @MessagePattern({ cmd: 'find-by-email' })
    async findByEmail(email: string) {
        return await this.userService.findByEmail(email);
    }

    @MessagePattern({ cmd: 'update-user' })
    async updateOne(data: { userId: string; dto: any }) {
        return await this.userService.updateOne(data.userId, data.dto);
    }

    @MessagePattern({ cmd: 'delete-user' })
    async deleteOne(id: string) {
        return await this.userService.deleteOne(id);
    }
}
