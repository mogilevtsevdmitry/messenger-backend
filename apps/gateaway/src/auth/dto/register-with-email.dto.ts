import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordsMatchingConstraint } from '@shared/validators';
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';

/**
 * Регистрация пользователя с помощью email и пароля с подтверждением
 */
export class RegisterWithEmailDto {
    /**
     * Email пользователя
     */
    @ApiProperty({ type: String, description: 'Email пользователя', example: faker.internet.email() })
    @IsEmail({}, { message: 'Email имеет не верный формат' })
    email: string;

    /**
     * Пароль. Минимальная длина 6 символов
     */
    @ApiProperty({ type: String, description: 'Пароль. Минимальная длина 6 символов', example: 'Pa$$w0rD' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина 6 символов' })
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    password: string;

    /**
     * Повторно тот же пароль.
     */
    @ApiProperty({
        type: String,
        description: 'Повторно тот же пароль.',
        example: 'Pa$$w0rD',
    })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина 6 символов' })
    @Validate(IsPasswordsMatchingConstraint)
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    confirmPassword: string;
}
