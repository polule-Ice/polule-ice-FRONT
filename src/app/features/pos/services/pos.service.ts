import { Injectable, signal, computed } from '@angular/core';
import { Sale, SaleItem, DailySummary } from '../models/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  private sales = signal<Sale[]>([]);
  currentSale = signal<SaleItem[]>([]);
  private employeeName = signal<string>('Empleado');

  // Computed properties
  currentSaleTotal = computed(() =>
    this.currentSale().reduce((sum, item) => sum + item.totalPrice, 0)
  );

  currentSaleItemCount = computed(() =>
    this.currentSale().reduce((sum, item) => sum + item.quantity, 0)
  );

  todaySales = computed(() => {
    const today = new Date().toDateString();
    return this.sales().filter(sale => sale.date.toDateString() === today);
  });

  constructor() {
    this.loadSalesFromStorage();
  }

  // Current sale management
  addToCurrentSale(item: SaleItem): void {
    const current = [...this.currentSale()];
    const existingIndex = current.findIndex(
      existing => existing.productId === item.productId &&
                  existing.flavor === item.flavor &&
                  existing.size === item.size
    );

    if (existingIndex >= 0) {
      current[existingIndex].quantity += item.quantity;
      current[existingIndex].totalPrice = current[existingIndex].quantity * current[existingIndex].unitPrice;
    } else {
      current.push({ ...item, id: this.generateId() });
    }

    this.currentSale.set(current);
  }

  removeFromCurrentSale(itemId: string): void {
    this.currentSale.set(
      this.currentSale().filter(item => item.id !== itemId)
    );
  }

  updateCurrentSaleItemQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCurrentSale(itemId);
      return;
    }

    this.currentSale.set(
      this.currentSale().map(item =>
        item.id === itemId
          ? { ...item, quantity, totalPrice: quantity * item.unitPrice }
          : item
      )
    );
  }

  clearCurrentSale(): void {
    this.currentSale.set([]);
  }

  // Complete sale
  completeSale(paymentMethod: 'efectivo' | 'tarjeta' | 'yape' | 'plin', cashReceived?: number, customerName?: string): Sale {
    const saleItems = this.currentSale();
    if (saleItems.length === 0) {
      throw new Error('No hay productos en la venta actual');
    }

    const subtotal = this.currentSaleTotal();
    const tax = subtotal * 0.18; // IGV 18%
    const total = subtotal + tax;
    const change = paymentMethod === 'efectivo' && cashReceived ? cashReceived - total : 0;

    const sale: Sale = {
      id: this.generateId(),
      saleNumber: this.generateSaleNumber(),
      date: new Date(),
      items: saleItems,
      subtotal,
      tax,
      total,
      paymentMethod,
      cashReceived,
      change,
      employeeName: this.employeeName(),
      customerName,
      status: 'completed'
    };

    const allSales = [...this.sales(), sale];
    this.sales.set(allSales);
    this.saveSalesToStorage();
    this.clearCurrentSale();

    return sale;
  }

  // Sales history
  getSales(): Sale[] {
    return this.sales();
  }

  getSalesByDateRange(startDate: Date, endDate: Date): Sale[] {
    return this.sales().filter(sale =>
      sale.date >= startDate && sale.date <= endDate
    );
  }

  getDailySummary(date: Date): DailySummary {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const daySales = this.getSalesByDateRange(dayStart, dayEnd);

    const paymentMethods = {
      efectivo: 0,
      tarjeta: 0,
      yape: 0,
      plin: 0
    };

    const flavorCounts: { [key: string]: number } = {};

    daySales.forEach(sale => {
      paymentMethods[sale.paymentMethod] += sale.total;

      sale.items.forEach(item => {
        flavorCounts[item.flavor] = (flavorCounts[item.flavor] || 0) + item.quantity;
      });
    });

    const topSellingFlavors = Object.entries(flavorCounts)
      .map(([flavor, quantity]) => ({ flavor, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      date: date.toDateString(),
      totalSales: daySales.length,
      totalAmount: daySales.reduce((sum, sale) => sum + sale.total, 0),
      salesByPaymentMethod: paymentMethods,
      topSellingFlavors
    };
  }

  // Employee management
  setEmployeeName(name: string): void {
    this.employeeName.set(name);
  }

  getEmployeeName(): string {
    return this.employeeName();
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateSaleNumber(): string {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const salesCount = this.todaySales().length + 1;
    return `V${dateStr}-${salesCount.toString().padStart(3, '0')}`;
  }

  private loadSalesFromStorage(): void {
    try {
      const stored = localStorage.getItem('pos_sales');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const sales = parsed.map((sale: any) => ({
          ...sale,
          date: new Date(sale.date)
        }));
        this.sales.set(sales);
      }
    } catch (error) {
      console.error('Error loading sales from storage:', error);
    }
  }

  private saveSalesToStorage(): void {
    try {
      localStorage.setItem('pos_sales', JSON.stringify(this.sales()));
    } catch (error) {
      console.error('Error saving sales to storage:', error);
    }
  }
}
