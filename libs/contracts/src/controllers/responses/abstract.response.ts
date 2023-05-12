export namespace AbstractResponse {
    export const total = {
        description: 'Кол-во записей в БД',
        type: 'number',
        example: 4,
        default: [],
    };

    export const rows = {
        description: 'Набор данных',
        default: [],
        isArray: true,
        items: {},
    };

    export const limit = {
        description: 'Сколько взять записей в БД',
        type: 'number',
        example: 4,
        maximum: 30,
        default: 25,
    };

    export const offset = {
        description: 'Сколько нужно отступить записей, что-бы взять N. Высчитывается по ф-уле: offset = offset * limit',
        type: 'number',
        example: 2,
    };
}
