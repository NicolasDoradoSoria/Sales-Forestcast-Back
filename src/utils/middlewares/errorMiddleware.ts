import { Request, Response, NextFunction } from 'express';

export function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: message,
    details: err.details || undefined
  });
}
