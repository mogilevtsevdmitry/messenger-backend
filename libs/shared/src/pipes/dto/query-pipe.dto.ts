const Include = ['user', 'token'] as const;
const Where = ['userId', 'tokenId', 'email'] as const;
const Options = ['take', 'skip'] as const;

export class QueryDto {
    public include = { user: false, token: false };
    public where = {
        id: undefined,
        user: undefined,
        token: undefined,
        email: undefined,
        nickname: undefined,
        sex: undefined,
        lastName: undefined,
        firstName: undefined,
    };
    public options = { take: 10, skip: 0 };

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
                this.include[key] = bool;
            }

            if (Where.includes(key as any)) {
                isNumber ? (this.where[key] = num) : (this.where[key] = value);
            }

            if (Options.includes(key as any) && isNumber) {
                this.options[key] = num;
            }
        }

        let {
            options: { take, skip },
        } = this;

        skip *= take;
        take > 10 ? (take = 10) : take;
    }
}
