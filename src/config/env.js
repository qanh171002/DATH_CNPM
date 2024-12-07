/* eslint-disable no-undef */
import 'dotenv/config';

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  BUILD_MODE: process.env.BUILD_MODE,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,

  APP_ID: process.env.APP_ID,
  KEY1: process.env.KEY1,
  KEY2: process.env.KEY2,
  ENDPOINT: process.env.ENDPOINT,

  GG_CLIENT_ID: process.env.GG_CLIENT_ID,
  GG_CLIENT_SECRET: process.env.GG_CLIENT_SECRET,

  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET
};
