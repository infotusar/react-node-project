import express from "express";
import cors from 'cors';
import 'express-async-errors';
import cookieSession from 'cookie-session';

// routing rules here
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
// Error-handler middleware
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(cors());
app.set( 'trust proxy', true ); //will trust https evenif it has ngnix proxy behind.
app.use(express.json());
app.use( cookieSession({
    signed: false, //default cookie encription is not needed, does JWT
    secure: true, //only for https
  })
);


app.use( currentUserRouter );
app.use( signupRouter );
app.use( signinRouter );
app.use( signoutRouter );

// app.all('*', () => {
//   throw new NotFoundError();
// });

// not found routing for unknown url: here async error functionality is handled by another express library
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// error handler middleware
app.use( errorHandler );

export { app };