import { Injectable, Inject } from '@nestjs/common';

import { SharedUseCase } from '../../../../common/shared.use-case';
import { ReceiptNotFoundException } from '../../../../common/exceptions/receipt.exception';
import { BaseInjectEnum } from '../../../../common/tokens/injection.token';
import { IDatabaseContext, IDeleteOneReceiptUseCase } from '../../../../common/types';

@Injectable()
export class DeleteOneReceiptUseCase extends SharedUseCase<string, boolean> implements IDeleteOneReceiptUseCase {
    public constructor(
        @Inject(BaseInjectEnum.DATABASE_CONTEXT) protected databaseContext: IDatabaseContext
    ) {
        super();
    }

    protected async implementation(id: string): Promise<boolean> {
        const result: boolean = await this.databaseContext
            .getReceiptRepository().deleteOneById(id);

        if (!result) throw new ReceiptNotFoundException(id);

        return result;
    }
}