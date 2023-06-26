import { CHAT_SERVICE, GetMessagesNamespace } from '@contracts/services/chat';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';
import { GetMessagesDto } from './dto';

@Controller('chat')
export class ChatController {
    constructor(@Inject(CHAT_SERVICE) private readonly chatClient: ClientProxy) {}

    @Get()
    async getMessages(@Query() query: GetMessagesDto) {
        const filter = plainToClass(GetMessagesDto, query);
        return this.chatClient.send<GetMessagesNamespace.Response, GetMessagesNamespace.Request>(
            GetMessagesNamespace.MessagePattern,
            filter,
        ).pipe(map((data) => ({
            ...data,
            limit: filter.limit,
            offset: filter.offset,
        })));
    }
}
