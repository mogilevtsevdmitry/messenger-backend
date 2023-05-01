import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ type: String, description: 'Email пользователя', example: faker.internet.email() })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, description: 'Пароль. Минимальная длина 6 символов', example: 'Pa$$w0rD' })
    @IsString()
    @MinLength(6)
    password: string;
}
