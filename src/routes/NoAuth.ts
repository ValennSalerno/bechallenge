import jwt from 'jsonwebtoken';
import express from 'express';
//import bcrypt from 'bcrypt';

const router = express.Router();
const secret = process.env.JWT_SECRET || 'defaultSecret';
const jwtTTL = parseInt(process.env.JWT_TTL || '3600', 10);

router.post('/login', (req, res) => {
  res.send('Login');
  //Validate input
  /*
  if (!username || !password ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  //Hash password
  const hashedPassword : string = bcrypt.hash(password, salt:10);

  //isPasswordCorrect

  */
});
  
router.post('/register', (req, res) => {
  //To Do: Unique username
  //Validate input
  //Hash password
  //Save in DB
  const userInDB = { id: 1, name: 'valen', admin: false };

  res.json({ 
    user: 'valen',
    token: jwt.sign({ exp: jwtTTL, data: { id: userInDB.id } }, secret),
  });
});

export default router;