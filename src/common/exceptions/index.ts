import { ExceptionTypeEnum } from '../tokens/exception.token';

export abstract class Exception {
    abstract type: ExceptionTypeEnum;
    
    constructor (
        public readonly code: number,
        public readonly message: string,
        public readonly inner?: any
    ) {}
  
    // public toString(): string {}
}