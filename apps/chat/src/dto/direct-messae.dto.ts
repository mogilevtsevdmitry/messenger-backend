/**
 * Объект личного сообщения
 */
export class DirectMessageDto {
    /**
     * Сообщение
     */
    text: string;

    /**
     * Вложение. Audio/Video/File/Image
     * @type {Buffer}
     */
    buffer: Buffer;

    /**
     * Получатель сообщения
     */
    recipientId: string;
}
