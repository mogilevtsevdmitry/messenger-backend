import { WhereDto, PaginationDto, IncludeDto } from '.';

export class QueryDto {
    include = new IncludeDto();
    where = new WhereDto();
    pagination = new PaginationDto();

    constructor(defaults: any) {
        this.itterate(defaults);
    }

    private itterate(defaults: object) {
        const { include, where, pagination } = this;

        for (const key in defaults) {
            const value = defaults[key];

            // To primitive type
            const num = Number(value);
            const isNumber = !isNaN(num);
            const toBoolean = value === 'true';

            if (include.is(key) && toBoolean) {
                include[key] = toBoolean;
            }

            if (where.user.is(key)) {
                where.user[key] = value;
            }

            if (where.token.is(key)) {
                where.user[key] = value;
            }

            if (isNumber) {
                if (key === 'offset' || key === 'limit') {
                    pagination[key] = num;
                }
            }
        }

        pagination.offset *= pagination.limit;
        if (pagination.limit > 25) pagination.limit = 25;
    }
}
