import { Controller } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @MessagePattern({ cmd: 'new-message' })
    newChat() {}
}
