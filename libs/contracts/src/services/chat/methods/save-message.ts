export namespace SaveMessageNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'save-chat-message',
    };

    /** #### Описание входящих данных
     *
     */
    export interface Request {
        /**
         * Идентификатор сообщения
         */
        id?: string;

        /**
         * Сообщение
         */
        content: string;

        /**
         * Отправитель
         */
        senderId: string;

        /**
         * Отправитель
         */
        recipientId: string;

        /**
         * Файлы
         */
        files?: string[];

        /**
         * Иконки
         */
        icons?: string[];

        /**
         * Идентификатор сообщения на который был ответ
         */
        parentMessageId?: string;
    }
}
