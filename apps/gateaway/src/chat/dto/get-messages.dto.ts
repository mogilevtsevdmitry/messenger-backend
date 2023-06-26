import { GetMessagesNamespace } from '@contracts/services/chat';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMessagesDto implements GetMessagesNamespace.Request {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset: number;

    @IsOptional()
    @IsString()
    @Type(() => String)
    sort?: string;

    [k: string]: unknown;
}
