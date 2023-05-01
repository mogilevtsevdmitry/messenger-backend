import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    providers: [],
    imports: [PrismaModule],
    exports: [PrismaModule],
})
export class ProvidersModule {}
