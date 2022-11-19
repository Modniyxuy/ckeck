import { Receipt } from '../../modules/locals/receipt/entities/receipt.entity';
import { CreateReceiptDto } from '../../modules/locals/receipt/dto/create-receipt.dto';

export interface ILogger {
    debug(context: string, message: string): void;
    log(context: string, message: string): void;
    error(context: string, message: string, trace?: string): void;
    warn(context: string, message: string): void;
    verbose(context: string, message: string): void;
}

export interface IManagementDatabaseContext {
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    releaseQueryRunner(): Promise<void>;
}

export interface IDatabaseContext extends IManagementDatabaseContext {
    getReceiptRepository(): IReceiptRepository;
}

export interface IReceiptRepository {
    insertReceipt(dto: CreateReceiptDto): Promise<Receipt>;
    findOneById(id: string): Promise<Receipt>;
    deleteOneById(id: string): Promise<boolean>;
}

export interface ICreateReceiptUseCase {
    execute(inputData: CreateReceiptDto, inTransactionEnum?: InTransactionEnum): Promise<Receipt>;
}

export interface IFindOneReceiptUseCase {
    execute(id: string, inTransactionEnum?: InTransactionEnum): Promise<Receipt>;
}

export interface IDeleteOneReceiptUseCase {
    execute(id: string, inTransactionEnum?: InTransactionEnum): Promise<boolean>;
}

export interface IReceiptRespone {
    id: string;
    domen: string;
    recipientsName: string;
    senderName: string;
    senderAddress: string;
    senderPhoneNumber: string;
    trackNumber: string;
    transferAmount: string;
    transferFee: string;
    transferTotal: string;
    date: string;
    language: string;
}

export interface IPanelResponse {
    key: string;
}

export interface ILinkResponse {
    link: string;
}

export enum InTransactionEnum {
    ON = 'ON',
    OFF = 'OFF'
}