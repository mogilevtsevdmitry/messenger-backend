/**
 * Объект личного сообщения
 */
export class DirectMessageDto {
    /**
     * Сообщение
     */
    text: string;

    /**
     * Получатель сообщения
     */
    recipientId: string;
}
