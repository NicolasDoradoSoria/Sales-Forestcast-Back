import { Request, Response, Router } from "express";
import { AuthService } from "../services/AuthService.js";
import { LoginRequestDTO } from "../dtos/LoginRequest.js";
import { LoginResponseDTO } from "../dtos/LoginResponse.js";
import { RegisterRequestDTO } from "../dtos/RegisterRequest.js";
import { validateLogin } from "../utils/middlewares/validateLogin.js";
import { BadRequestException } from "../utils/exceptions/BadRequestException.js";

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", validateLogin, this.login.bind(this));
        this.router.post("/register", this.register.bind(this));
        this.router.post("/logout", this.logout.bind(this));
        this.router.post("/refresh", this.refreshToken.bind(this));
    }

    async register(req: Request, res: Response) {
        const { email, password, confirmPassword } = req.body as RegisterRequestDTO;
        const result = await this.authService.register(email, password, confirmPassword);
        return res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body as LoginRequestDTO;
        const tokens: LoginResponseDTO = await this.authService.login(email, password);
        return res.json(tokens);
    }

    async logout(req: Request, res: Response) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new BadRequestException('Refresh token required');
        }
        await this.authService.logout(refreshToken);
        return res.status(200).json({ message: 'Logged out successfully' });
    }

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new BadRequestException('Refresh token required');
        }
        const result = await this.authService.refreshToken(refreshToken);
        return res.json(result);
    }
}
