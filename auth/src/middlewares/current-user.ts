import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    email: string
}

// inside the express project find the request object where currentUser is defined or not then do defined
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = ( req: Request, res: Response, next: NextFunction ) => {
    if( !req.session?.jwt ){
        return next();
    }

    try {
        
        const payload = jwt.verify( req.session.jwt, process.env.JWT_KEY_NAME! ) as UserPayload;
        req.currentUser = payload;

    } catch (error) { }

    next();
};