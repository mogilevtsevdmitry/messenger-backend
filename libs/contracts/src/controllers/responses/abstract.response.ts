export namespace AbstractResponse {
    export const total = {
        description: 'Кол-во записей в БД',
        type: 'number',
        example: 4,
        default: [],
    };

    export const data = {
        description: 'Набор данных',
        default: [],
        isArray: true,
        items: {},
    };

    export const take = {
        description: 'Сколько взять записей в БД',
        type: 'number',
        example: 4,
        maximum: 10,
        default: 10,
    };

    export const skip = {
        description: 'Сколько нужно отступить записей, что-бы взять N. Высчитывается по ф-уле: skip = skip * take',
        type: 'number',
        example: 2,
    };
}
