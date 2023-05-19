import { ChatGatewayNamespace } from '@contracts/chat';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from './services/user.service';

@WebSocketGateway(ChatGatewayNamespace.Port, { namespace: ChatGatewayNamespace.Namespace, cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);
    private clients: Map<string, Socket> = new Map();

    constructor(
        private readonly userService: UserService,
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
    ) {}

    afterInit() {
        this.logger.log('Chat gateway initialized');
    }

    /** Подключение пользователя */
    handleConnection(client: Socket) {
        this.clients.set(client.id, client);
        this.logger.debug(`Client connected: ${client.id}`);

        try {
            const token = client.handshake.headers?.authorization.split(' ')[1];
            this.logger.debug({ token });
            const user = this.jwt.verify(token, this.configService.get('JWT_ACCESS_TOKEN_SECRET'));
            this.logger.debug(user);
            client['user'] = user;
            this.userService.currentUser(user.userId).subscribe((res) => this.logger.debug(res));
        } catch (err) {
            client.disconnect();
        }
        // Пользователь залогинен
    }

    /** Отключение пользователя */
    handleDisconnect(client: Socket) {
        this.clients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // Личный чат
    @SubscribeMessage(ChatGatewayNamespace.DirectMessage)
    handlePrivateChat(client: Socket, payload: any): void {
        const { recipientId, message } = payload;
        const recipient = this.clients.get(recipientId);
        if (recipient) {
            recipient.emit(ChatGatewayNamespace.DirectMessage, { senderId: client.id, message });
        }
    }
}
