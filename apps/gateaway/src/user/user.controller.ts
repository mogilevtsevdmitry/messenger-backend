import { FindCurrentUserMethod } from '@contracts/controllers/user';
import { FindUserNamespace, USER_SERVICE } from '@contracts/services/user';
import {
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
import { User } from '@prisma/client';
import { CurrentUser } from '@shared/decorators';
import { handleTimeoutAndErrors } from '@shared/helpers';
import { map } from 'rxjs';
import { UserResponse } from './responses';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(@Inject(USER_SERVICE) private readonly client: ClientProxy) {}

    @ApiOperation({
        summary: FindCurrentUserMethod.summary,
        description: FindCurrentUserMethod.description,
    })
    @ApiOkResponse({
        type: UserResponse,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(FindCurrentUserMethod.path)
    getCurrentUser(@CurrentUser('userId', ParseUUIDPipe) userId: string) {
        return this.client
            .send<FindUserNamespace.Response, FindUserNamespace.Request>(FindUserNamespace.MessagePattern, {
                userId,
            })
            .pipe(
                map((user) => {
                    if (!user) {
                        throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
                    }
                    return new UserResponse(user as Partial<User>);
                }),
                handleTimeoutAndErrors(),
            );
    }
}
