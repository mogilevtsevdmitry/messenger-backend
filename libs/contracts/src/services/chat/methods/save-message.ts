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
    }

    /** #### Описание ответа
     *
     */
    export interface Response {
        /**
         * Идентификатор созданного сообщения
         */
        id: string;
    }
}
