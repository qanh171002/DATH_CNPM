import mysql from 'mysql';
import { env } from '~/config/env';
import { promisify } from 'util';

export const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});

const connectAsynce = promisify(connection.connect).bind(connection);
export const queryAsync = promisify(connection.query).bind(connection);

export const connectToDB = async () => {
  await connectAsynce();
};
