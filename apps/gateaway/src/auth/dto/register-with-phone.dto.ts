import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class RegisterWithPhoneUserDto {
    @ApiProperty({
        type: String,
        description: 'Телефонный номер пользователя',
        example: faker.phone.number('7-9##-###-####'),
    })
    @IsPhoneNumber()
    phone: string;
}
