import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class WhereTokenDto {
    @ApiPropertyOptional({
        description: 'Найти пользователя по токену',
        example: 4,
        type: 'number',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsUUID()
    @IsOptional()
    @IsPositive()
    @Expose({ groups: ['token'] })
    userId?: string;
}
