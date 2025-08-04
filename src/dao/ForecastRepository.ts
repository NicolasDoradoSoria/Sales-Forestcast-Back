import { prisma } from '../db/prisma.js';
import { ForecastResultDTO } from '../dtos/ForecastResult.js';

export class ForecastRepository {
  async saveForecasts(userId: number, forecasts: ForecastResultDTO[]) {
    const dataToSave = forecasts.flatMap(f => 
      f.predictions.map(p => ({
        userId,
        sku: f.sku,
        forecast_date: new Date(p.date),
        base_value: p.base_value,
        upper_bound: p.upper_bound,
        lower_bound: p.lower_bound,
        confidence_level: 0.95, // O un valor del DTO si lo tienes
        seasonal_factor: 0, // O un valor del DTO si lo tienes
        trend_component: 0, // O un valor del DTO si lo tienes
        model_version: '1.0', // O un valor del DTO si lo tienes
        data_quality_score: 0, // O un valor del DTO si lo tienes
        generated_at: new Date(),
      }))
    );

    await prisma.forecast.createMany({
      data: dataToSave,
    });
  }
 
  async findBySku(userId: number, sku: string): Promise<ForecastResultDTO> {
    const records = await prisma.forecast.findMany({
      where: { userId, sku },
      orderBy: { forecast_date: 'asc' }
    });

    if (!records.length) {
      throw new Error('No forecast data found');
    }

    return {
      sku,
      horizon_months: records.length,
      predictions: records.map(r => ({
        date: r.forecast_date.toISOString().split('T')[0],
        base_value: r.base_value,
        upper_bound: r.upper_bound,
        lower_bound: r.lower_bound,
      }))
    };
  }


}