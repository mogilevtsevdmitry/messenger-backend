import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Авторизация через телефон
 */
export class LoginPhoneDto {
    /**
     * Телефон пользователя
     */
    @ApiProperty({ type: String, description: 'Телефон пользователя', example: faker.phone.number('+7 9##-###-####') })
    @IsPhoneNumber('RU', { message: 'Телефон имеет не верный формат' })
    phone: string;

    /**
     * 4х значный код подтверждения
     * Используется только на этапе авторизации по коду
     * Живет 2 мин, после чего необходимо запросить новый код.
     * Максимум 3 попытки - потом телефон попадает в бан на сутки
     */
    @ApiProperty({
        type: String,
        description: `4х значный код подтверждения
Используется только на этапе авторизации по коду
Живет 2 мин, после чего необходимо запросить новый код.
Максимум 3 попытки - потом телефон попадает в бан на сутки    
    `,
        example: '1234',
    })
    @IsOptional()
    @IsString({ message: 'Не верный формат кода' })
    @Length(4, 4, { message: 'Длина кода должна составлять 4 символа' })
    @Type(() => String)
    code?: string;
}
