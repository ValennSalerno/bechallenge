import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
import router from './routes/NoAuth';
import router1 from './routes/auth';
// import { access } from 'fs'; para imagenes luego

require('dotenv').config();

const app = express();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

try {
  (async function () {
    await s3.putObject({
      Bucket: 'ss-be-challenge',
      Key: 'sshot.png',
      Body: 'Hello from AWS S3!',
    }).promise();
  })();
} catch (error) {
  // config dropbox
}

app.use('/NoAuth', router); //register and login
app.use('/auth', router1); //stats and upload
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello Sirius People!  Register  Login</h1>');
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
