import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { LoggerModule } from './modules/globals/logger/logger.module';
import { ConfigModule } from './modules/globals/config/config.module';
import { DatabaseModule } from './modules/globals/database/database.module';
import { ReceiptModule } from './modules/locals/receipt/receipt.module';
import { ThrottlerConfigService } from './modules/globals/config/throttler-config.service';
import { ThrottlerGuard } from './common/guards/throttler.guard';

@Module({
    imports: [
        ThrottlerModule.forRootAsync(ThrottlerConfigService.getAsyncOptions()),
        LoggerModule,
        ConfigModule,
        DatabaseModule,
        ReceiptModule
    ],
    providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        }
    ]
})
export class AppModule {}