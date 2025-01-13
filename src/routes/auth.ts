import express from 'express';
import * as middlewares from '../middlewares';
//import { PrismaClient } from '@prisma/client';

const router1 = express.Router();
//const prisma = new PrismaClient();

router1.post('/upload', middlewares.auth, (req, res) => {
  res.json({ message: 'File uploaded' });
});

router1.get('/stats', middlewares.auth, async (req, res) => {
  const user = req.user;

  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  //
  
}); 

export default router1;