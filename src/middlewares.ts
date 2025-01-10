import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';
import jwt from 'jsonwebtoken';

const secret = 'RhdGEiOnsiaWQ';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function auth(req: Request, res: Response, next: NextFunction) { 
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'Token required!' });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token!' });
  }
}