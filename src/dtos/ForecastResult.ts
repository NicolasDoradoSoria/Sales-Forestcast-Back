export interface ForecastPrediction {
  date: string; // Formato YYYY-MM
  base_value: number;
  upper_bound: number;
  lower_bound: number;
}

export interface ForecastResultDTO {
  sku: string;
  horizon_months: number;
  predictions: ForecastPrediction[];
}
