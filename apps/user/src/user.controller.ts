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

    @MessagePattern({ cmd: 'create-user' })
    registerUser(createUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @MessagePattern({ cmd: 'find-all-users' })
    findAll() {
        return this.userService.findAll();
    }
}
