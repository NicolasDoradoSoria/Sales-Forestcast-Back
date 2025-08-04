import { BadRequestException } from "../utils/exceptions/BadRequestException.js";

export interface SalesDataProps {
  sku: string;
  fecha: Date;
  cantidad_vendida: number;
  precio: number;
  promocion_activa: boolean;
  categoria?: string;
}

export class SalesData {
  public readonly sku: string;
  public readonly fecha: Date;
  public readonly cantidad_vendida: number;
  public readonly precio: number;
  public readonly promocion_activa: boolean;
  public readonly categoria: string;

  public constructor(props: SalesDataProps) {
    this.sku = props.sku;
    this.fecha = props.fecha;
    this.cantidad_vendida = props.cantidad_vendida;
    this.precio = props.precio;
    this.promocion_activa = props.promocion_activa;
    this.categoria = props.categoria || '';
  }

  public static create(rawData: any, rowIndex: number): SalesData {
    const { sku, fecha, cantidad_vendida, precio, promocion_activa, categoria } = rawData;

    if (!sku || !fecha || !cantidad_vendida || !precio) {
      throw new BadRequestException(`Missing required fields at row ${rowIndex}`);
    }

    const parsedDate = new Date(fecha);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException(`Invalid date format at row ${rowIndex}: ${fecha}`);
    }

    const parsedQty = Number(cantidad_vendida);
    if (isNaN(parsedQty) || parsedQty < 0) {
      throw new BadRequestException(`Invalid quantity at row ${rowIndex}: ${cantidad_vendida}`);
    }

    const parsedPrice = Number(precio);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new BadRequestException(`Invalid price at row ${rowIndex}: ${precio}`);
    }

    const parseBoolean = (val: any): boolean => {
      if (val === null || val === undefined) return false;
      const norm = String(val).toLowerCase().trim();
      return ['true', '1', 'sí', 'yes'].includes(norm);
    };

    return new SalesData({
      sku: String(sku),
      fecha: parsedDate,
      cantidad_vendida: parsedQty,
      precio: parsedPrice,
      promocion_activa: parseBoolean(promocion_activa),
      categoria: String(categoria || ''),
    });
  }
}