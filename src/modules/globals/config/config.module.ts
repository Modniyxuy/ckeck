import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

import { TypeOrmConfigService } from './typeorm-config.service';
import { ThrottlerConfigService } from './throttler-config.service';

@Global()
@Module({
    imports: [
        NestjsConfigModule.forRoot()
    ],
    providers: [
        TypeOrmConfigService,
        ThrottlerConfigService
    ],
    exports: [
        TypeOrmConfigService,
        ThrottlerConfigService
    ]
})
export class ConfigModule {}