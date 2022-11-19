import { Injectable, Inject } from '@nestjs/common';

import { Receipt } from '../entities/receipt.entity';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { SharedUseCase } from '../../../../common/shared.use-case';
import { ReceiptAlreadyExists } from '../../../../common/exceptions/receipt.exception';
import { BaseInjectEnum } from '../../../../common/tokens/injection.token';
import { IDatabaseContext, ICreateReceiptUseCase } from '../../../../common/types';

@Injectable()
export class CreateReceiptUseCase extends SharedUseCase<CreateReceiptDto, Receipt> implements ICreateReceiptUseCase {
    public constructor(
        @Inject(BaseInjectEnum.DATABASE_CONTEXT) protected databaseContext: IDatabaseContext
    ) {
        super();
    }

    protected async implementation(receiptData: CreateReceiptDto): Promise<Receipt> {
        let receipt: Receipt;
        receipt = await this.databaseContext
            .getReceiptRepository().findOneById(receiptData.id);
        if (receipt) throw new ReceiptAlreadyExists(receiptData.id);
        receipt = await this.databaseContext
            .getReceiptRepository().insertReceipt(receiptData);

        return receipt;
    }
}