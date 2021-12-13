import express, { Request, Response } from "express";
import { body } from "express-validator";
// import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';


import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from "../mongoose/users";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post( "/api/users/signup",
[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
], 
validateRequest,
async (req: Request, res: Response) => {
    // const errors = validationResult(req);
    const { email, password } = req.body;

    // if (!errors.isEmpty()) {
      // return res.status(400).json( errors.array() );
      // throw new Error("Invalid email or password!");
      // throw new RequestValidationError( errors.array() );
    // }

    // const { email, password } = req.body;
    // console.log("Creating a user...");
    // throw new Error('Error connecting to database!');
    // throw new DatabaseConnectionError();
    
    // if (!email || typeof email !== 'string') {
        //   res.status(400).send('Provide a valid email');
        // }

    // res.send({});

    const existUser = await User.findOne({email});

    if(existUser) {
      throw new BadRequestError("You already signed up with this email!");
    }

    const user = User.build({ email, password });
    await user.save();

    //generate jwt
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY_NAME! );

    //store it on session object
    req.session = {
      jwt: userJwt
    }

    res.status(201).send(user);
});

export { router as signupRouter };
