import { AbstractResponse } from '@contracts/controllers/responses';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@shared/pipes';

export class Response<T> extends PaginationDto {
    @ApiProperty({ ...AbstractResponse.total })
    total: number;

    @ApiProperty({ ...AbstractResponse.data })
    data: T[];
}
