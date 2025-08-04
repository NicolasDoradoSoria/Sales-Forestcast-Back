import { prisma } from "../db/prisma.js"
import { User } from "@prisma/client"

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async save(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    return await prisma.user.create({ data: userData })
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }
}
