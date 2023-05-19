import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class IncludeDto {
    @ApiPropertyOptional({
        description: 'Вернуть ли пользователя в ответ',
        example: true,
        type: 'boolean',
        default: false,
    })
    @IsPositive()
    @Type(() => Boolean)
    @Expose({ groups: ['include'] })
    user = false;

    @ApiPropertyOptional({
        description: 'Вернуть ли токен в ответ',
        type: 'boolean',
        example: true,
        default: false,
    })
    @Type(() => Boolean)
    @Expose({ groups: ['include'] })
    token = false;
}
