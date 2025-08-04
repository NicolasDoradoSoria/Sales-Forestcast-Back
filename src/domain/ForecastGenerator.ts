import { SalesData } from './SalesData.js';
import { ForecastPrediction } from '../dtos/ForecastResult.js';

export class ForecastGenerator {
  // Simulación de un motor de pronósticos "inteligente"
  public static generate(
    historicalData: SalesData[],
    horizonMonths: number
  ): ForecastPrediction[] {
    if (historicalData.length < 3) {
      // No hay suficientes datos para un pronóstico significativo
      return [];
    }

    // 1. Agrupar ventas por mes
    const monthlySales = this.groupSalesByMonth(historicalData);

    // 2. Calcular la media móvil de los últimos 3 meses
    const lastThreeMonths = Array.from(monthlySales.values()).slice(-3);
    const movingAverage = lastThreeMonths.reduce((sum, val) => sum + val, 0) / lastThreeMonths.length;

    // 3. Generar predicciones
    const predictions: ForecastPrediction[] = [];
    const lastDate = new Date(Math.max(...Array.from(monthlySales.keys()).map(d => new Date(d).getTime())));

    for (let i = 1; i <= horizonMonths; i++) {
      const forecastDate = new Date(lastDate);
      forecastDate.setMonth(forecastDate.getMonth() + i);

      const base_value = Math.round(movingAverage * (1 + (Math.random() - 0.5) * 0.1)); // +/- 5% de variabilidad
      const confidenceFactor = 0.2; // +/- 20% de intervalo de confianza

      predictions.push({
        date: `${forecastDate.getFullYear()}-${String(forecastDate.getMonth() + 1).padStart(2, '0')}`,
        base_value,
        upper_bound: Math.round(base_value * (1 + confidenceFactor)),
        lower_bound: Math.round(base_value * (1 - confidenceFactor)),
      });
    }

    return predictions;
  }

  private static groupSalesByMonth(data: SalesData[]): Map<string, number> {
    const monthlySales = new Map<string, number>();
    for (const sale of data) {
      const monthKey = `${sale.fecha.getFullYear()}-${String(sale.fecha.getMonth() + 1).padStart(2, '0')}`;
      const currentSales = monthlySales.get(monthKey) || 0;
      monthlySales.set(monthKey, currentSales + sale.cantidad_vendida);
    }
    return monthlySales;
  }
}