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

            // if (pagination.is(key) && isNumber) {
            //     pagination[key] = num;
            // }

            if (isNumber) {
                if (key === 'take' || key === 'skip') {
                    pagination[key] = num;
                }
            }
        }

        pagination.skip *= pagination.take;
        if (pagination.take > 10) pagination.take = 10;
    }
}
