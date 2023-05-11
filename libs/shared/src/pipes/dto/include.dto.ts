import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class IncludeDto {
    @ApiPropertyOptional({
        description: 'Вернуть ли пользователя в ответ',
        example: true,
        type: 'boolean',
        default: false,
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Boolean)
    user?: boolean = false;

    @ApiPropertyOptional({
        description: 'Вернуть ли токен в ответ',
        type: 'boolean',
        example: true,
        default: false,
    })
    @IsOptional()
    @Type(() => Boolean)
    token?: boolean = false;

    is = (key: string) => ['user', 'token'].includes(key);
}
