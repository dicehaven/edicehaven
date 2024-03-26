import dotenv from 'dotenv';
dotenv.config();

const config = {
  SECRETKEY: process.env.JWT_SECRET_KEY,
  ATLAS_DB: process.env.ATLAS_DB
};

export default config;
