import { faker } from '@faker-js/faker';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsString, IsEmail } from 'class-validator';

export class WhereUserDto {
    @ApiPropertyOptional({
        description: 'Поиск пользователя по уникальному uuid',
        type: 'uuid',
        example: faker.datatype.uuid(),
    })
    @IsUUID()
    @IsString()
    @IsOptional()
    id?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по email',
        type: 'string',
        example: faker.internet.email(),
    })
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по конкретному имени',
        type: 'string',
        example: faker.name.fullName(),
    })
    @IsString()
    @IsOptional()
    nickname?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по конкретному имени',
        type: 'string',
        example: faker.name.firstName(),
    })
    @IsString()
    @IsOptional()
    firstName?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по фамилии',
        type: 'string',
        example: faker.name.lastName(),
    })
    @IsString()
    @IsOptional()
    lastName?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по полу',
        type: 'string',
        example: faker.name.sex(),
    })
    @IsString()
    @IsOptional()
    sex?: string = undefined;

    is = (key: string) => ['id', 'email', 'nickname', 'firstName', 'lastName', 'sex'].includes(key);
}
