import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordsMatchingConstraint } from '@shared/validators';
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';

export class RegisterWithEmailUserDto {
    @ApiProperty({ type: String, description: 'Email пользователя', example: faker.internet.email() })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, description: 'Пароль. Минимальная длина 6 символов', example: 'Pa$$w0rD' })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        description: 'Повторно тот же пароль.',
        example: 'Pa$$w0rD',
    })
    @IsString()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    @IsNotEmpty()
    confirmPassword: string;
}
