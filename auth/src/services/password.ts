import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify( scrypt );

export class Password {
    static async toHash ( password: string ){
        const salt  = randomBytes(8).toString('hex');
        const buff = await asyncScrypt( password, salt, 64 ) as Buffer;

        return `${buff.toString('hex')}.${salt}`;
    }

    static async compare ( storedPassword: string, suppliedPassword: string ){
        const [ hashedPassword, salt ] = storedPassword.split('.');
        const buff = (await asyncScrypt( suppliedPassword, salt, 64 ) as Buffer);

        return buff.toString('hex') === hashedPassword;
    }
}