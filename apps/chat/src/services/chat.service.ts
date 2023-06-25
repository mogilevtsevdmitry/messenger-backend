import { SaveMessageNamespace } from '@contracts/services/chat';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async newMessage(message: SaveMessageNamespace.Request) {
        const { content, recipientId, senderId, id, files = [], icons = [], parentMessageId = null } = message;
        const chatName = [recipientId, senderId].sort().join('-');

        const chat = await this.prisma.chat.upsert({
            where: { name: chatName },
            update: {},
            create: {
                name: chatName,
            },
        });

        const newMessage = await this.prisma.message.upsert({
            where: { id },
            update: {
                message: content,
                files,
                icons,
            },
            create: {
                message: content,
                userId: senderId,
                chatId: chat.id,
                files,
                icons,
            },
        });

        /**
         * Если был ответ на сообщение - добавляем созданное id сообщение в массив родительского
         */
        if (parentMessageId) {
            await this.prisma.message.update({
                where: { id: parentMessageId },
                data: {
                    children: {
                        push: newMessage.id,
                    },
                },
            });
        }

        return newMessage;
    }
}
