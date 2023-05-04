type Mixed = number | boolean | string;

const NUM_QUERIES = ['take', 'offset'];
const BOOLEAN_QUERIES = ['user', 'token'];

export class QueryDto {
    include = {
        token: false,
        user: false,
    };
    where = {
        userId: 0,
    };
    take = 0;
    offset = 0;

    constructor(defaults: any) {
        typeof defaults === 'object' ? this.itterate(defaults) : this.get(defaults);
    }

    private itterate(defaults: object) {
        for (const key in defaults) {
            const value = defaults[key];

            // To primitive type
            const num = Number(value);
            const bool = value === 'true';

            const isNumber = !isNaN(num);
            const isBoolean = value === 'true' || value === 'false';

            if (key === 'user' && isBoolean) {
                this.include[key] = bool;
            }

            if (key === 'token' && isBoolean) {
                this.include[key] = bool;
            }

            if (key === 'take' && isNumber) {
                this.take = num;
            }

            if (key === 'offset' && isNumber) {
                this.offset = num;
            }

            if (key === 'userId' && isNumber) {
                this.where.userId = num;
            }
        }
    }

    private get(defaults: any) {
        return defaults;
    }
}
