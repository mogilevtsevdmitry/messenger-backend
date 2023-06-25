import { SaveMessageNamespace } from '@contracts/services/chat';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './services/chat.service';

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @MessagePattern(SaveMessageNamespace.MessagePattern)
    newChat(message: SaveMessageNamespace.Request) {
        return this.chatService.newMessage(message);
    }
}
