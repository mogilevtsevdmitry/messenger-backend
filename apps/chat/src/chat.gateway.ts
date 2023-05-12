import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket, Namespace } from 'socket.io';

@WebSocketGateway({ namespace: 'messages', cors: true }) // 5005, { cors: true }
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);
    @WebSocketServer() io: Namespace;
    private clients: Map<string, Socket> = new Map();

    afterInit(server: Server) {
        this.logger.log('Chat gateway initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        const sockets = this.io.sockets;
        this.clients.set(client.id, client);
        this.logger.log(`Client connected: ${client.id}`);
        this.logger.debug(`Connected sockets: ${sockets.size}`);
    }

    handleDisconnect(client: Socket) {
        this.clients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    /** Обработка сообщений */
    // Групповой чат
    @SubscribeMessage('groupChat')
    handleGroupChat(client: Socket, payload: any): void {
        const { groupName, message } = payload;
        this.logger.debug({ groupName, message });
        client.to(groupName).emit('new-group-message', { groupName, message });
    }

    // Личный чат
    @SubscribeMessage('chat')
    handlePrivateChat(client: Socket, payload: any): void {
        const { recipientId, message } = payload;
        this.logger.debug({ recipientId, message });
        const recipient = this.clients.get(recipientId);
        if (recipient) {
            recipient.emit('newPrivateMessage', { senderId: client.id, message });
        }
    }

    // Обработка подключения и отключения от группы
    @SubscribeMessage('joinGroup')
    joinGroup(client: Socket, groupName: string): void {
        client.join(groupName);
    }

    @SubscribeMessage('leaveGroup')
    leaveGroup(client: Socket, groupName: string): void {
        client.leave(groupName);
    }
}
