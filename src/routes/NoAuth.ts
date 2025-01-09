import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();
const secret = 'RhdGEiOnsiaWQ';
const jwtTTL = Math.floor(Date.now() / 1000) + 60 * 60; //pasarlo al .env


router.post('/login', (req, res) => {
  res.send('Login');
});

router.post('/register', (req, res) => {
  //To Do: save in DB
  const userInDB = { id: 1, name: 'valen', admin: false };

  res.json({ 
    user: 'valen',
    token: jwt.sign({ exp: jwtTTL, data: { id: userInDB.id } }, secret),
  });
});

export default router;