import { Injectable, Inject } from '@nestjs/common';

import { Receipt } from '../entities/receipt.entity';
import { SharedUseCase } from '../../../../common/shared.use-case';
import { ReceiptNotFoundException } from '../../../../common/exceptions/receipt.exception';
import { BaseInjectEnum } from '../../../../common/tokens/injection.token';
import { IDatabaseContext, IFindOneReceiptUseCase } from '../../../../common/types';

@Injectable()
export class FindOneReceiptUseCase extends SharedUseCase<string, Receipt> implements IFindOneReceiptUseCase {
    public constructor(
        @Inject(BaseInjectEnum.DATABASE_CONTEXT) protected databaseContext: IDatabaseContext
    ) {
        super();
    }

    protected async implementation(id: string): Promise<Receipt> {
        const receipt: Receipt = await this.databaseContext
            .getReceiptRepository().findOneById(id);

        if (!receipt) throw new ReceiptNotFoundException(id);

        return receipt;
    }
}