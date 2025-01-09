import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
import jwt from 'jsonwebtoken';


require('dotenv').config();

const app = express();

const secret = 'RhdGEiOnsiaWQ';
const jwtTTL = Math.floor(Date.now() / 1000) + 60 * 60; //pasarlo al .env


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello Sirius People!  Register  Login</h1>');
});

app.post('/register', (req, res) => {
  //To Do: save in DB
  const userInDB = { id: 1, name: 'valen', admin: false };

  res.json({ 
    user: 'valen',
    token: jwt.sign({ exp: jwtTTL, data: { id: userInDB.id } }, secret),
  });
});

//app.post('/login', (req, res) => {});

app.post('/upload', middlewares.auth, (req, res) => {
  res.json({ message: 'File uploaded' });
});

app.get('/stats', middlewares.auth, (req, res) => {
  res.json([
    {
      id: 1,
      user: 'Valen',
      files: 5,
    },
  ]);
}); //show all the stats


app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export default app;
