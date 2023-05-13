import { AbstractResponse } from '@contracts/controllers/responses';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto, QueryDto } from '@shared/pipes';

export interface IResponseMany<T> {
    total?: number | { _count: { id: number } };
    rows: T | T[];
    offset?: number;
    limit?: number;
    opts?: QueryDto;
}

export class ResponseMany<T> extends PaginationDto {
    /** Кол-во записей в БД */
    @ApiProperty({ ...AbstractResponse.total })
    total: number;

    /** Набор данных */
    @ApiProperty({ ...AbstractResponse.rows })
    rows: Partial<T>[];

    constructor(response: IResponseMany<Partial<T>>) {
        super();

        if (!Array.isArray(response.rows)) {
            this.rows = [response.rows];
        } else {
            this.rows = response.rows;
        }

        if (!response.total) {
            this.total = this.rows.length;
        }

        if (typeof response.total === 'object') {
            this.total = response.total._count.id;
        } else {
            this.total = response.total;
        }

        this.offset = response.offset || response.opts?.pagination.offset || 0;
        this.limit = response.limit || response.opts?.pagination.limit || this.total;
    }
}
