import { Expose } from 'class-transformer';
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
    @Expose({ groups: ['user'] })
    id?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по email',
        type: 'string',
        example: faker.internet.email(),
    })
    @IsEmail()
    @IsString()
    @IsOptional()
    @Expose({ groups: ['user'] })
    email?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по конкретному имени',
        type: 'string',
        example: faker.name.fullName(),
    })
    @IsString()
    @IsOptional()
    @Expose({ groups: ['user'] })
    nickname?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по конкретному имени',
        type: 'string',
        example: faker.name.firstName(),
    })
    @IsString()
    @IsOptional()
    @Expose({ groups: ['user'] })
    firstName?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по фамилии',
        type: 'string',
        example: faker.name.lastName(),
    })
    @IsString()
    @IsOptional()
    @Expose({ groups: ['user'] })
    lastName?: string = undefined;

    @ApiPropertyOptional({
        description: 'Поиск по полу',
        type: 'string',
        example: faker.name.sex(),
    })
    @IsString()
    @IsOptional()
    @Expose({ groups: ['user'] })
    sex?: string = undefined;
}
