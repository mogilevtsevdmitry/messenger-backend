import { AbstractResponse } from '@contracts/controllers/responses';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
    @ApiPropertyOptional({ ...AbstractResponse.take })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    take = 10;

    @ApiPropertyOptional({ ...AbstractResponse.skip })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    skip = 0;
}
