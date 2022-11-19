import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../config/typeorm-config.service';
import { databaseProviders } from './database.provider';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync(TypeOrmConfigService.getAsyncOptions()),
    ],
    providers: [
        ...databaseProviders
    ],
    exports: [
        ...databaseProviders
    ]
})
export class DatabaseModule {}