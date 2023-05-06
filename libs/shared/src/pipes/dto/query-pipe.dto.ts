const Include = ['user', 'token'] as const;
const Where = ['userId', 'tokenId'] as const;
const Options = ['take', 'offset'] as const;

export class QueryDto {
    public map = {
        include: new Map<string, boolean>(),
        where: new Map<string, string | number | boolean>(),
        options: new Map<string, any>(),
    };

    public include = { user: false, token: false };
    public where = { userId: 0, tokenId: 0 };
    public options = { take: 10, offset: 0 };

    constructor(defaults: any) {
        this.itterate(defaults);
    }

    private itterate(defaults: object) {
        for (const key in defaults) {
            const value = defaults[key];

            // To primitive type
            const num = Number(value);
            const bool = value === 'true';

            const isNumber = !isNaN(num);
            const isBoolean = value === 'true' || value === 'false';

            if (Include.includes(key as any) && isBoolean) {
                this.map.include.set(key, bool);
            }

            if (Where.includes(key as any)) {
                if (isNumber) {
                    this.map.where.set(key, num);
                } else {
                    this.map.where.set(key, value);
                }
            }

            if (Options.includes(key as any)) {
                if (isNumber) {
                    this.map.options.set(key, num);
                } else {
                    this.map.options.set(key, value);
                }
            }
        }

        const { include, options, where, mapToObject } = this;

        this.include = mapToObject(this.map.include) as typeof include;
        this.where = mapToObject(this.map.where) as typeof where;
        this.options = mapToObject(this.map.options) as typeof options;
    }

    mapToObject(array: Map<string, any>) {
        const queries = {};

        for (const [key, value] of array) {
            queries[key] = value;
        }
        return queries;
    }
}
