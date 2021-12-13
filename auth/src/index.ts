import mongoose from 'mongoose';
import { app } from './app';

// connecting to mongodb database from inside the pods
const start = async () => {
  
  if(!process.env.JWT_KEY_NAME){
    throw new Error("JWT_KEY must be defined!"); //must set env variable on pods
  }

  try {
    await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to mongodb');
  } catch (error) {
    console.log("connection error");
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
