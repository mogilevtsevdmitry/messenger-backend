import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

/**
 * Данные для регистрации по телефону
 */
export class RegisterWithPhoneDto {
    /** Телефонный номер */
    @ApiProperty({ type: String, description: 'Телефонный номер', example: faker.phone.number('+7 9## ### ####') })
    @IsPhoneNumber('RU', { message: 'Не верный формат телефонного номера' })
    phone: string;
}
