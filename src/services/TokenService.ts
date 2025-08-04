import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import { addDays } from '../utils/date.js';
import { UnauthorizedException } from '../utils/exceptions/UnauthorizedException.js';

export class TokenService {
  generateAccessToken(user: any) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
  }

  generateRefreshToken(user: any): string {
    return jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
  }

  async saveRefreshToken(userId: number, token: string) {
    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expires_at: addDays(new Date(), 7),
      },
    });
  }

  async removeRefreshToken(token: string) {
    await prisma.refreshToken.deleteMany({ where: { token } });
  }

  async verifyAndGetUser(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as any;

      const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!tokenRecord || new Date(tokenRecord.expires_at) < new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      return tokenRecord.user;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
