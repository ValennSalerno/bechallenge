import express from 'express';
import * as middlewares from '../middlewares';

const router1 = express.Router();

router1.post('/upload', middlewares.auth, (req, res) => {
  res.json({ message: 'File uploaded' });
});

router1.get('/stats', middlewares.auth, (req, res) => {
  res.json([
    {
      id: 1,
      user: 'Valen',
      files: 5,
    },
  ]);
}); //show all the stats
 

export default router1;