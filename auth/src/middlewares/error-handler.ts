import { Request, Response, NextFunction } from 'express';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log("Something went wrong", err);

    if( err instanceof CustomError ){
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    // if( err instanceof RequestValidationError ){
    //     // console.log( "Handling this error as a request validation error" );
    //     // const formattedError = err.errors.map(error => {
    //     //     return { message: error.msg, field: error.param };
    //     // });
    //     // return res.status(400).send( {errors: formattedError} );
    //     return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    // }

    // if( err instanceof DatabaseConnectionError ){
    //     // console.log("Handling this error as a db connection error!");
    //     // return res.status(500).send( {errors: [{ message: err.reason }] } );
    //     return res.status(err.statusCode).send( {errors: err.serializeErrors() } );
    // }

    res.status(400).send({ errors: [{ message: "Something went wrong!" }] });
};