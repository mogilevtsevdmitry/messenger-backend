import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'get-user-by-email' })
    getUserByEmail(findUserByEmailDto) {
        return this.userService.findUserByEmail(findUserByEmailDto);
    }

    @MessagePattern({ cmd: 'get-user-by-id' })
    getUserById(userId: { userId: string }) {
        return this.userService.findUserById(userId.userId);
    }

    @MessagePattern({ cmd: 'create-user' })
    registerUser(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
