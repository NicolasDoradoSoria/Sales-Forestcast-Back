import { ForecastGenerator } from '../domain/ForecastGenerator.js';
import { ForecastInputDTO } from '../dtos/ForecastInput.js';
import { ForecastResultDTO } from '../dtos/ForecastResult.js';
import { PrismaSalesDataRepository } from '../dao/PrismaSalesDataRepository.js';
import { ForecastRepository } from '../dao/ForecastRepository.js';
import { BadRequestException } from '../utils/exceptions/BadRequestException.js';
import { validate } from 'class-validator';
import {plainToInstance } from 'class-transformer';
import { AuthenticatedRequest } from '../utils/middlewares/authenticateJWT.js';

export class ForecastService {
    private salesDataRepository: PrismaSalesDataRepository;
    private forecastRepository: ForecastRepository;

    constructor() {
        this.salesDataRepository = new PrismaSalesDataRepository();
        this.forecastRepository = new ForecastRepository();
    }

  public async generateForecast(userId: number, rawInput: any): Promise<ForecastResultDTO> {
    const input = await this.validateInput(rawInput);
    const historicalData = await this.salesDataRepository.findBySku(userId, input.sku);

    const predictions = ForecastGenerator.generate(
      historicalData,
      input.horizon_months
    );

    const result: ForecastResultDTO = {
      sku: input.sku,
      horizon_months: input.horizon_months,
      predictions,
    };

    await this.forecastRepository.saveForecasts(userId, [result]);
    return result;
  }

  private async validateInput(raw: any): Promise<ForecastInputDTO> {
     const input = plainToInstance(ForecastInputDTO, raw);
    
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid forecast input', errors);
    }
    return input;
  }

  public async getForecastsBySku(req: AuthenticatedRequest): Promise<ForecastResultDTO> {
    const userId = req.user!.id;
    const sku = req.params.sku;
    return this.forecastRepository.findBySku(userId, sku);
}

}