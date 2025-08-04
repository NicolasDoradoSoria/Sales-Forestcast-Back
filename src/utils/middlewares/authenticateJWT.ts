// middlewares/authenticateJWT.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    next();
  
}
