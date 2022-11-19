import { Injectable } from '@nestjs/common';
import { ThrottlerModuleOptions, ThrottlerAsyncOptions } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService {
    public constructor() {}

    public getOptions(): ThrottlerModuleOptions {
        const throttlerOptions: ThrottlerModuleOptions = {
            ttl: 60,
            limit: 200
        };

        return throttlerOptions;
    }

    public static getAsyncOptions(): ThrottlerAsyncOptions {
        const throttlerAsyncOptions: ThrottlerAsyncOptions = {
            useFactory: async (
                throttlerConfigService: ThrottlerConfigService
            ) => throttlerConfigService.getOptions(),
            inject: [ThrottlerConfigService]
        };

        return throttlerAsyncOptions;
    }
}