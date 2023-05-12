import { AbstractResponse } from '@contracts/controllers/responses';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
    /** Сколько взять записей в БД */
    @ApiPropertyOptional({ ...AbstractResponse.limit })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit = 10;

    /** Сколько нужно отступить записей */
    @ApiPropertyOptional({ ...AbstractResponse.offset })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    offset = 0;
}
