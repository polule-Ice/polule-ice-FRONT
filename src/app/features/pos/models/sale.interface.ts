export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  flavor: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  saleNumber: string;
  date: Date;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'yape' | 'plin';
  cashReceived?: number;
  change?: number;
  employeeName: string;
  customerName?: string;
  status: 'completed' | 'cancelled' | 'pending';
}

export interface DailySummary {
  date: string;
  totalSales: number;
  totalAmount: number;
  salesByPaymentMethod: {
    efectivo: number;
    tarjeta: number;
    yape: number;
    plin: number;
  };
  topSellingFlavors: {
    flavor: string;
    quantity: number;
  }[];
}
