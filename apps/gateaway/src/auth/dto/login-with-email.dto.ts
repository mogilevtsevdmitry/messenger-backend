import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginWithEmailDto {
    /**
     * Email пользователя
     */
    @ApiProperty({ type: String, description: 'Email пользователя', example: faker.internet.email() })
    @IsEmail({}, { message: 'Email имеет не верный формат' })
    email: string;

    /**
     * Пароль
     * Минимальная длина 6 символов
     */
    @ApiProperty({ type: String, description: 'Пароль. Минимальная длина 6 символов', example: 'Pa$$w0rD' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина 6 символов' })
    password: string;
}
