import { CHAT_SERVICE, ChatGatewayNamespace, SaveMessageNamespace } from '@contracts/services/chat';
import { FindUserNamespace, USER_SERVICE } from '@contracts/services/user';
import { BadRequestException, Inject, Logger, OnModuleDestroy, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { SocketCurrentUser, extractUserFromSocket } from '@shared/decorators';
import { User } from '@shared/interfaces';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway(ChatGatewayNamespace.Port, { namespace: ChatGatewayNamespace.Namespace, cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleDestroy {
    private readonly logger = new Logger(ChatGateway.name);
    private clients: Map<string, { socket: Socket; user: User }> = new Map();
    private readonly destroy$ = new Subject<void>();

    constructor(
        @Inject(USER_SERVICE) private readonly userClient: ClientProxy,
        @Inject(CHAT_SERVICE) private readonly chatClient: ClientProxy,
    ) {}

    afterInit() {
        this.logger.log('Chat gateway initialized');
    }

    /** Подключение пользователя */
    handleConnection(socket: Socket) {
        const userId = extractUserFromSocket<string>(socket, 'userId');
        this.logger.log(`Client connected: ${userId}`);
        this._handleConnection(socket, userId);
    }

    /** Отключение пользователя */
    handleDisconnect(client: Socket) {
        this.clients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // Личный чат
    @SubscribeMessage(ChatGatewayNamespace.DirectMessage)
    handlePrivateChat(
        @SocketCurrentUser('userId') userId: string,
        @MessageBody() payload: SaveMessageNamespace.Request,
    ): void {
        if (!userId) {
            throw new UnauthorizedException();
        }
        const recipient = this.clients.get(payload.recipientId);
        this.chatClient
            .emit(SaveMessageNamespace.MessagePattern, {
                ...payload,
                senderId: userId,
            })
            .pipe(
                tap(() => {
                    if (recipient) {
                        recipient.socket.emit(ChatGatewayNamespace.DirectMessage, {
                            ...payload,
                            senderId: userId,
                        });
                    }
                }),
                takeUntil(this.destroy$),
                catchError((err) => {
                    throw new BadRequestException(err);
                }),
            );
    }

    onModuleDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Складываем в Map подключившегося пользователя
     *
     * @param socket сокет
     * @param userId идентификатор клиента
     */
    private _handleConnection(socket: Socket, userId: string): void {
        try {
            this.userClient
                .send<FindUserNamespace.Response, FindUserNamespace.Request>(FindUserNamespace.MessagePattern, {
                    id: userId,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((user) => this.clients.set(user.id, { socket, user }));
        } catch (err) {
            socket.disconnect();
        }
    }
}
