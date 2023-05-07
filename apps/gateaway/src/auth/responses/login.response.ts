import { ApiProperty } from '@nestjs/swagger';

/**
 * Результат авторизации с помощью email и пароля
 */
export class LoginResponse {
    @ApiProperty({ type: String, description: 'JWT access токен' })
    accessToken: string;
}
