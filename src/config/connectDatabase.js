import mysql from 'mysql';
import { env } from '~/config/env';

export const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});

export const connectToDB = async () => {
  await connection.connect();
};
