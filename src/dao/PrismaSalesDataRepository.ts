import { SalesDataRepository } from '../domain/SalesDataRepository.js';
import { SalesData } from '../domain/SalesData.js';
import { prisma } from '../db/prisma.js';

export class PrismaSalesDataRepository implements SalesDataRepository {

  public async getLatestVersion(userId: number, fileName: string): Promise<number> {
    const result = await prisma.salesData.aggregate({
      _max: {
        data_version: true,
      },
      where: {
        userId: userId,
        file_name: fileName,
      },
    });
    return result._max.data_version || 0;
  }

  public async saveMany(data: SalesData[], userId: number, fileName: string, version: number): Promise<void> {
    const dataToCreate = data.map(item => ({
      userId: userId,
      sku: item.sku,
      date: item.fecha,
      quantity: item.cantidad_vendida,
      price: item.precio,
      promotion: item.promocion_activa,
      category: item.categoria,
      file_name: fileName,
      data_version: version,
    }));

    await prisma.salesData.createMany({
      data: dataToCreate,
    });
  }

  public async findBySku(userId: number, sku: string): Promise<SalesData[]> {
    const salesRecords = await prisma.salesData.findMany({
      where: {
        userId: userId,
        sku: sku,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return salesRecords.map(
      (r) =>
        new SalesData({
          sku: r.sku,
          fecha: r.date,
          cantidad_vendida: r.quantity,
          precio: r.price,
          promocion_activa: r.promotion,
          categoria: r.category || ''
        })
    );
  }

  public async findByFileName(userId: number, fileName: string): Promise<SalesData[]> {
    const records = await prisma.salesData.findMany({
      where: {
        userId,
        file_name: fileName,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return records.map(
      r =>
        new SalesData({
          sku: r.sku,
          fecha: r.date,
          cantidad_vendida: r.quantity,
          precio: r.price,
          promocion_activa: r.promotion,
          categoria: r.category ?? '',
        })
    );
  }

}