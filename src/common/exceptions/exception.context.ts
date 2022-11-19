import { Exception } from '.';
import { ExceptionTypeEnum } from '../tokens/exception.token';

export abstract class AuthenticationException extends Exception {
    public readonly type = ExceptionTypeEnum.AUTHENTICATION;
}

export abstract class NotAllowedException extends Exception {
    public readonly type = ExceptionTypeEnum.AUTHORIZATION;
}

export abstract class NotFoundException extends Exception {
    public readonly type = ExceptionTypeEnum.NOT_FOUND;
}

export abstract class TooManyRequestsException extends Exception {
    public readonly type = ExceptionTypeEnum.TOO_MANY_REQUESTS;
}

export abstract class ClientException extends Exception {
    public readonly type = ExceptionTypeEnum.CLIENT;
}

export abstract class ServerException extends Exception {
    public readonly type = ExceptionTypeEnum.SERVER;
}