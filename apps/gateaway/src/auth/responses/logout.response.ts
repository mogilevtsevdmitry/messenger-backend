import { ApiProperty } from '@nestjs/swagger';

/**
 * Результат выполнения Logout
 */
export class LogoutResponse {
    @ApiProperty({ type: Boolean, description: 'Результат logout', example: true })
    result: boolean;
}
