import { Injectable } from '@nestjs/common';
import { Chat, ChatType, Message } from '@prisma/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Создание чата
     *
     * @param type тип
     * @example private | group
     */
    async createChat(type: ChatType = ChatType.private): Promise<Chat> {
        return this.prisma.chat.create({
            data: {
                name: v4(),
                type,
            },
        });
    }

    async createMessage(chatId: string, message: Partial<Message>): Promise<Message> {
        return this.prisma.message.create({
            data: {
                chatId,
                content: message.content,
                fileId: message?.fileId,
                userId: message.userId,
            },
        });
    }
}
