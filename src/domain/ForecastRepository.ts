import { SalesData } from './SalesData.js';

export interface ForecastRepository {
  getHistoricalDataForSKU(sku: string): Promise<SalesData[]>;
}
