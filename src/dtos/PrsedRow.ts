export interface ParsedRowDTO {
  sku: string;
  fecha: Date;
  cantidad_vendida: number;
  precio: number;
  promocion_activa: boolean;
  categoria: string;
}