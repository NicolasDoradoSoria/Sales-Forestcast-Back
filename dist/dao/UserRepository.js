import { prisma } from "../db/prisma.js";
export class UserRepository {
    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }
    async save(userData) {
        return await prisma.user.create({ data: userData });
    }
    async findAll() {
        return await prisma.user.findMany();
    }
}
//# sourceMappingURL=UserRepository.js.map