import { UnauthorizedException } from "../utils/exceptions/UnauthorizedException.js";
import { BadRequestException } from "../utils/exceptions/BadRequestException.js";
import { UserRepository } from "../dao/UserRepository.js";
import * as bcrypt from 'bcrypt';
import { RegisterResponseDTO } from "../dtos/RegisterResponse.js";
import { TokenService } from "./TokenService.js";
import { LoginResponseDTO } from "../dtos/LoginResponse.js";
import { User } from "../domain/User.js";

export class AuthService {
  private userRepository: UserRepository;
  private tokenService: TokenService;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenService = new TokenService();
  }

  async register(email: string, password: string, confirmPassword: string): Promise<Omit<RegisterResponseDTO, 'token'>> {
    const user = User.create(email, password, confirmPassword, 'USER');

    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
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

   async login(email: string, password: string): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);

    await this.tokenService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeRefreshToken(refreshToken);
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.tokenService.verifyAndGetUser(refreshToken);
    const accessToken = this.tokenService.generateAccessToken(user);
    return { accessToken };
  }
}
