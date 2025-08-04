export class SalesDataResponseDTO {
  sku: string;
  date: string; // ISO string
  quantity: number;
  price: number;
  promotion: boolean;
  category: string;

  constructor(data: {
    sku: string;
    date: Date;
    quantity: number;
    price: number;
    promotion: boolean;
    category: string;
  }) {
    this.sku = data.sku;
    this.date = data.date.toISOString();
    this.quantity = data.quantity;
    this.price = data.price;
    this.promotion = data.promotion;
    this.category = data.category;
  }
}
