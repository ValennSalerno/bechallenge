import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
const secret = process.env.JWT_SECRET || 'defaultSecret';
const jwtTTL = parseInt(process.env.JWT_TTL || '3600', 10);

const isPasswordCorrect = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPassword);
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isCorrect = await isPasswordCorrect(password, user.password);

    if (!isCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});
  
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'user',
      },
    });

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, secret, { expiresIn: jwtTTL });

    res.json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

export default router;