import { IManagementDatabaseContext, InTransactionEnum } from './types';

export abstract class SharedUseCase<TInputData = void, TOutputData = void> {
    protected inputData: TInputData;
    protected inTransaction: boolean;
    protected abstract databaseContext: IManagementDatabaseContext | null;

    public async execute(
        inputData: TInputData,
        inTransaction: InTransactionEnum = InTransactionEnum.OFF
    ): Promise<TOutputData> {
        this.inputData = inputData;
        this.inTransaction = inTransaction === InTransactionEnum.ON;

        let result: TOutputData;

        try {
            if (this.inTransaction) await this.databaseContext.startTransaction();
            result = await this.implementation(inputData);
            if (this.inTransaction) await this.databaseContext.commitTransaction();
        } catch (error) {
            if (this.inTransaction) await this.databaseContext.rollbackTransaction();
            throw error;
        }
        await this.databaseContext.releaseQueryRunner();

        return result;
    }

    protected abstract implementation(inputData: TInputData): TOutputData | Promise<TOutputData>;
}