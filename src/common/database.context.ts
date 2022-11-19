import { Injectable, Inject } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { Receipt } from '../modules/locals/receipt/entities/receipt.entity';
import { ReceiptRepository } from '../modules/locals/receipt/repositories/receipt.repository';
import { BaseInjectEnum } from './tokens/injection.token';
import { IDatabaseContext, IReceiptRepository } from './types';

@Injectable()
export class DatabaseContext implements IDatabaseContext {
    private queryRunner: QueryRunner;
    private receiptRepository: IReceiptRepository;

    public constructor(
        @Inject(BaseInjectEnum.DATA_SOURCE) public appDataSource: DataSource
    ) {
        this.initRepositories();
    }

    public async startTransaction(): Promise<void> {
        this.queryRunner = this.appDataSource.createQueryRunner();
        await this.queryRunner.startTransaction();
    }

    public async commitTransaction(): Promise<void> {
        if (!this.queryRunner) return;
        try {
            await this.queryRunner.commitTransaction();
        } catch (error) {
            throw error;
        } finally {
            await this.queryRunner.release();
        }
    }

    public async rollbackTransaction(): Promise<void> {
        if (!this.queryRunner) return;
        try {
            await this.queryRunner.rollbackTransaction();
        } catch (error) {
            throw error;
        } finally {
            await this.queryRunner.release();
        }
    }

    public async releaseQueryRunner(): Promise<void> {
        if (!this.queryRunner) return;
        await this.queryRunner.release();
    }

    public getReceiptRepository(): IReceiptRepository {
        return this.receiptRepository;
    }

    private initRepositories(): void {
        this.receiptRepository = this.appDataSource.getRepository(Receipt).extend(ReceiptRepository);
    }
}