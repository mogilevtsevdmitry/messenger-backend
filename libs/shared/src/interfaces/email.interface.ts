import { ISendMailOptions } from '@nestjs-modules/mailer';

enum EmailStatus {
    NEW = 'new',
    CREATED = 'created',
    SEND_PENDING = 'send pending',
    SENDED = 'sended',
    REJECTED = 'rejected',
}

export interface Email {
    id: string;
    status: EmailStatus;
}

export interface SendMailOptions extends ISendMailOptions {
    to: string[];
    subject: string;
}
