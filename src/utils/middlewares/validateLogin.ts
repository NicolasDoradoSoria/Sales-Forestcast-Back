// middlewares/validateLogin.ts
import { Request, Response, NextFunction } from 'express'

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Email is required and must be a string' })
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required and must be a string' })
  }

  next()
}
