import { Router } from "express";
import { AuthService } from "../services/AuthService.js";
export class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.router = Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/login", this.login.bind(this));
        this.router.post("/register", this.register.bind(this));
    }
    async register(req, res) {
        const { email, password } = req.body;
        const result = await this.authService.register(email, password);
        if (result instanceof Error) {
            return res.status(400).json({ error: result.message });
        }
        return res.status(201).json(result);
    }
    async login(req, res) {
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        if (result instanceof Error) {
            return res.status(401).json({ error: result.message });
        }
        return res.json(result);
    }
}
//# sourceMappingURL=AuthController.js.map