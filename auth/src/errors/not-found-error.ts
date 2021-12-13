import { CustomError } from "./custom-error";
export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super("404 - Page not found!");

        Object.setPrototypeOf( this, NotFoundError.prototype );
    }

    serializeErrors() {
        return [{ message: '404 - Page not found!' }];
    }
}