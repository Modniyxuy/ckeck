import { NotAllowedException, TooManyRequestsException } from './exception.context';
import { ErrorCodeEnum } from '../tokens/exception.token';

export class KeyIsIncorrect extends NotAllowedException {
    public constructor() {
        super(
            ErrorCodeEnum.KEY_IS_INCORRECT,
            `The provided key is incorrect!`
        );
    }
}

export class Throttler extends TooManyRequestsException {
    public constructor() {
        super(
            ErrorCodeEnum.THROTTLER,
            `Too Many Requests!`
        );
    }
}