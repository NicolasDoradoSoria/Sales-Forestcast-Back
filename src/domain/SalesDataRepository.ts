import { SalesData } from './SalesData.js';

export interface SalesDataRepository {
  getLatestVersion(userId: number, fileName: string): Promise<number>;
  saveMany(data: SalesData[], userId: number, fileName: string, version: number): Promise<void>;
  findBySku(userId: number, sku: string): Promise<SalesData[]>;
}
