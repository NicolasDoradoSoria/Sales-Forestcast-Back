import jwt from 'jsonwebtoken';

export function generateAccessToken(user: { id: number; email: string; role: string; }) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
}

export function generateRefreshToken(user: { id: number; }) {
  return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });
}