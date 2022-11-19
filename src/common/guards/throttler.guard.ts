import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard as NestjsThrottlerGuard } from '@nestjs/throttler';

import { Throttler } from '../exceptions/management.exception';

@Injectable()
export class ThrottlerGuard extends NestjsThrottlerGuard {
    protected throwThrottlingException(context: ExecutionContext): void {
        throw new Throttler();
    }
}