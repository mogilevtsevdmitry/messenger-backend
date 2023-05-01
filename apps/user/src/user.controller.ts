import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'get-user*' })
    getUser() {
        return {
            userId: '4a9f7816-e6bb-11ed-a05b-0242ac120003',
            email: 'admin@mail.ru',
            roles: ['ADMIN'],
        };
    }

    @MessagePattern({ cmd: 'create-user' })
    registerUser() {
        return {
            userId: '4a9f7816-e6bb-11ed-a05b-0242ac120003',
            email: 'admin@mail.ru',
            roles: ['ADMIN'],
        };
    }
}
