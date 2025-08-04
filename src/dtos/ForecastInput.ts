import { IsInt, IsString, Max, Min } from 'class-validator';

export class ForecastInputDTO {
  @IsString()
  sku!: string;

  @IsInt()
  @Min(1)
  @Max(6)
  horizon_months!: number;
}