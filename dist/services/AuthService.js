import { UserRepository } from "../dao/UserRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async register(email, password) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            return new Error('User already exists');
        }
        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.save({ email, password_hash, role: 'USER' });
        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        };
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return new Error('User not found');
        }
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            return new Error('Invalid password');
        }
        if (!process.env.JWT_SECRET) {
            return new Error('JWT_SECRET not found in environment variables');
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
        return token;
    }
}
//# sourceMappingURL=AuthService.js.map