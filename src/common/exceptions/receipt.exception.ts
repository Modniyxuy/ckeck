import { NotFoundException, ClientException } from './exception.context';
import { ErrorCodeEnum } from '../tokens/exception.token';

export class ReceiptNotFoundException extends NotFoundException {
    public constructor(id: string) {
        super(
            ErrorCodeEnum.RECEIPT_NOT_FOUND,
            `Receipt with id ${id} not found!`
        );
    }
}

export class ReceiptIdIsMissingException extends NotFoundException {
    public constructor() {
        super(
            ErrorCodeEnum.RECEIPT_ID_IS_MISSING,
            `Receipt id is missing!`
        );
    }
}

export class ReceiptParameterIsMissingException extends NotFoundException {
    public constructor() {
        super(
            ErrorCodeEnum.RECEIPT_PARAMETER_IS_MISSING,
            `Receipt required parameter is missing!`
        );
    }
}

export class ReceiptAlreadyExists extends ClientException {
    public constructor(id: string) {
        super(
            ErrorCodeEnum.RECEIPT_ALREADY_EXISTS,
            `Receipt with id ${id} already exists!`
        );
    }
}