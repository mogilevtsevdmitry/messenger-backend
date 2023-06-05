import {
    DeleteUserMethod,
    FindUserByEmail,
    FindUserMethod,
    FindUsersMethod,
    UpdateUserMethod,
} from '@contracts/controllers/user';
import { RegisterWithEmailNamespace } from '@contracts/services/auth';
import {
    DeleteUserNamespace,
    FindUserNamespace,
    FindUsersNamespace,
    USER_SERVICE,
    UpdateUserNamespace,
} from '@contracts/services/user';
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Put,
    Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { handleTimeoutAndErrors } from '@shared/helpers';
import { User } from '@shared/interfaces';
import { IQueryPipe, PaginationDto, ParseEmailPipe, QueryPipe } from '@shared/pipes';
import { ResponseMany } from '@shared/responses';
import { map } from 'rxjs';
import { UpdateUserDto } from './dto';
import { UserResponse } from './responses';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(@Inject(USER_SERVICE) private client: ClientProxy) {}

    @ApiOperation({
        summary: FindUsersMethod.summary,
        description: FindUsersMethod.description,
    })
    @ApiOkResponse({ type: ResponseMany<User> })
    @ApiQuery({ type: PaginationDto })
    @Get(FindUsersMethod.path)
    async findAll(@Query(QueryPipe) opts?: IQueryPipe) {
        return this.client.send(FindUsersNamespace.MessagePattern, opts);
    }

    @ApiOperation({
        summary: FindUserMethod.summary,
        description: FindUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Get(FindUserMethod.path)
    async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.client.send(FindUserNamespace.MessagePattern, userId);
    }

    @ApiOperation({
        summary: FindUserByEmail.summary,
        description: FindUserByEmail.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Get(FindUserByEmail.path)
    async findByEmail(@Param('email', ParseEmailPipe) email: string) {
        return this.client.send(RegisterWithEmailNamespace.MessagePattern, email);
    }

    @ApiOperation({
        summary: UpdateUserMethod.summary,
        description: UpdateUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Put(UpdateUserMethod.path)
    async updateOne(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: UpdateUserDto) {
        return this.client.send(UpdateUserNamespace.MessagePattern, { userId, dto }).pipe(
            map((user) => {
                if (!user) {
                    throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
                }
                return new UserResponse(user);
            }),
            handleTimeoutAndErrors(),
        );
    }

    @ApiOperation({
        summary: DeleteUserMethod.summary,
        description: DeleteUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Delete(DeleteUserMethod.path)
    async deleteOne(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.client.send(DeleteUserNamespace.MessagePattern, userId);
    }
}
