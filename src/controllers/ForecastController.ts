import {Response, Router } from 'express';
import { ForecastService } from '../services/ForecastService.js';
import { AuthenticatedRequest, authenticateJWT } from '../utils/middlewares/authenticateJWT.js';

export class ForecastController {
  public router: Router;
  private forecastService: ForecastService;

  constructor() {
    this.router = Router();
    this.forecastService = new ForecastService()
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', authenticateJWT, this.generate.bind(this));
    this.router.get('/:sku', authenticateJWT, this.getBySku.bind(this));
  }

  public generate = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const result = await this.forecastService.generateForecast(req.user!.id, req.body);
    res.status(200).json(result);
  };

  public async getBySku(req: AuthenticatedRequest, res: Response): Promise<void> {
    const results = await this.forecastService.getForecastsBySku(req);
    res.status(200).json(results);
  }

}
