import {
    BadRequestException,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    NotFoundException,
    ParseUUIDPipe,
    UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@shared/decorators';
import { catchError, map } from 'rxjs';
import { UserResponse } from './respnonses/user.response';
import { handleTimeoutAndErrors } from '@shared/helpers';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

    @ApiOperation({
        summary: 'Получение данных пользователя',
        description: 'Получение данных авторизованного пользователя',
    })
    @ApiOkResponse({
        type: UserResponse,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getCurrentUser(@CurrentUser('userId', ParseUUIDPipe) userId: string) {
        return this.client.send({ cmd: 'find-user' }, userId).pipe(
            map((user) => {
                if (!user) {
                    throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
                }
                return new UserResponse(user);
            }),
            handleTimeoutAndErrors(),
        );
    }
}
