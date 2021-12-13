import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 501;
    
    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}