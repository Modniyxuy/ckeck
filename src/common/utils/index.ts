import { ExceptionTypeEnum } from '../tokens/exception.token';

export function buildExceptionTypesMap(): Map<string, number> {
    const typesMap = new Map<string, number>()
        .set(ExceptionTypeEnum.AUTHENTICATION, 401)
        .set(ExceptionTypeEnum.AUTHORIZATION, 403)
        .set(ExceptionTypeEnum.NOT_FOUND, 404)
        .set(ExceptionTypeEnum.TOO_MANY_REQUESTS, 429)
        .set(ExceptionTypeEnum.CLIENT, 400)
        .set(ExceptionTypeEnum.SERVER, 500);

    return typesMap;
}

export function isObjectEmpty(object: any): boolean {
    for (const key in object) {
        return false;
    }
    return true;
}

export function dateFormatter(date: Date): string {
    return date.getDate() + '/' + 
        date.getMonth() + '/' + 
        date.getFullYear().toString().slice(2) + ' ' + 
        date.getHours() + ':' +
        date.getMinutes();
}