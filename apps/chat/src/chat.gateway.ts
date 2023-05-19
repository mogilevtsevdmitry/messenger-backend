import { ChatGatewayNamespace } from '@contracts/chat';
import { Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { User } from '@shared/interfaces';
import { Socket } from 'socket.io';
import { UserService } from './services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { DirectMessageDto } from './dto';
import { UserPayload } from '@shared/decorators';

@WebSocketGateway(ChatGatewayNamespace.Port, { namespace: ChatGatewayNamespace.Namespace, cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleDestroy {
    private readonly logger = new Logger(ChatGateway.name);
    private clients: Map<string, { socket: Socket; user: User }> = new Map();
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly userService: UserService,
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
    ) {}

    afterInit() {
        this.logger.log('Chat gateway initialized');
    }

    /** Подключение пользователя */
    handleConnection(socket: Socket) {
        this.logger.debug(`Client connected: ${this._handleConnection(socket)}`);
    }

    /** Отключение пользователя */
    handleDisconnect(client: Socket) {
        this.clients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // Личный чат
    @SubscribeMessage(ChatGatewayNamespace.DirectMessage)
    handlePrivateChat(@MessageBody() payload: DirectMessageDto, @ConnectedSocket() socket: Socket): void {
        const { recipientId, text } = payload;
        const recipient = this.clients.get(recipientId);
        const senderId = this._handleConnection(socket);
        if (recipient) {
            recipient.socket.emit(ChatGatewayNamespace.DirectMessage, { senderId, text });
        }
    }

    onModuleDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private _handleConnection(socket: Socket): string {
        try {
            const token = socket.handshake.headers?.authorization.split(' ')[1];
            const user = this.jwt.verify<UserPayload>(token, this.configService.get('JWT_ACCESS_TOKEN_SECRET'));
            socket['user'] = user;
            this.userService
                .currentUser(user.userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((user) => this.clients.set(user.id, { socket, user }));
            return user.userId;
        } catch (err) {
            socket.disconnect();
        }
    }
}
