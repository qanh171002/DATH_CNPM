/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { env } from '~/config/env';
import { API } from '~/routes/index';
import { connectToDB } from '~/config/connectDatabase';

const SERVER = () => {
  const app = express();

  var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  };

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use('/api', API);

  if (env.BUILD_MODE == 'dev') {
    app.listen(env.APP_PORT, () => {
      console.log(`Running on: http://${env.APP_HOST}:${env.APP_PORT}/api/home`);
    });
  }
};

connectToDB()
  .then(() => console.log('Connect to MySQL successfully!'))
  .then(() => SERVER())
  .catch((err) => console.log(err));
