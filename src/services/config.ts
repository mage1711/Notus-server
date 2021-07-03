import dotenv from 'dotenv';


const envFound = dotenv.config();
if (envFound.error) {

  throw new Error("Couldn't find .env file");
}

export default {
  DATABASE_URL: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  ORIGIN: process.env.ORIGIN,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
}