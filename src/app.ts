import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
import router from './routes/NoAuth';
import router1 from './routes/auth';

require('dotenv').config();

const app = express();

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
