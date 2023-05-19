import { AbstractResponse } from '@contracts/controllers/responses';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
    /** Сколько взять записей в БД */
    @ApiPropertyOptional({ ...AbstractResponse.limit })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive()
    @Max(100)
    @Min(1)
    @Type(() => Number)
    @Expose({ groups: ['pagination'] })
    limit = 100;

    /** Сколько нужно отступить записей */
    @ApiPropertyOptional({ ...AbstractResponse.offset })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    @Expose({ groups: ['pagination'] })
    offset = 0;
}
