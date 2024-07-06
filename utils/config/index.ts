import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || '',
  MONGODB_URL: process.env.MONGODB_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'Prueb@S3cr3TA',
  PRODUCTION: process.env.NODE_ENV || 'production'
};

export default config;