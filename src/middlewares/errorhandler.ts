import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'MulterError' || err.message === 'Only image files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'idError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({ message });
}