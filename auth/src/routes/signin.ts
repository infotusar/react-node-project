import express, { Request, Response } from 'express';
// import { body, validationResult } from 'express-validator';
import { body } from 'express-validator';
// import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';

import { User } from '../mongoose/users';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/bad-request-error';

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', 
[
  body("email")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("You must supply a password")
],
validateRequest,
async (req: Request, res: Response) => {
  // //
  // const errors = validationResult(req);

  // if(!errors.isEmpty()){
  //   throw new RequestValidationError(errors.array());
  // }
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if(!existingUser){
    throw new BadRequestError("Invalid credentials!");
  }

  const passwordMatch = await Password.compare( existingUser.password.toString(), password );
  if(!passwordMatch){
    throw new BadRequestError('Invalid password!');
  }

  // Generate the JWT
  const userJWT = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY_NAME! );

  // Store it on the Session object
  req.session = {
    jwt: userJWT
  };

  res.status(200).send('Hi there!');
});

export { router as signinRouter };
