import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PosService } from '../../services/pos.service';
import { Sale, DailySummary } from '../../models/sale.interface';

@Component({
  selector: 'app-pos-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos-reports.component.html'
})
export class PosReportsComponent implements OnInit {
  todaySales = signal<Sale[]>([]);
  dailySummary = signal<DailySummary | null>(null);
  selectedDate = signal<string>('');
  allSales = signal<Sale[]>([]);
  filteredSales = signal<Sale[]>([]);

  constructor(
    private posService: PosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate.set(today.toISOString().split('T')[0]);
    this.loadData();
  }

  loadData(): void {
    const selectedDate = new Date(this.selectedDate() + 'T00:00:00');

    // Get all sales
    const allSales = this.posService.getSales();
    this.allSales.set(allSales);

    // Get today's sales
    const todaySales = this.posService.todaySales();
    this.todaySales.set(todaySales);

    // Get daily summary for selected date
    const summary = this.posService.getDailySummary(selectedDate);
    this.dailySummary.set(summary);

    // Filter sales for selected date
    const startDate = new Date(selectedDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999);

    const filtered = this.posService.getSalesByDateRange(startDate, endDate);
    this.filteredSales.set(filtered);
  }

  onDateChange(): void {
    this.loadData();
  }

  getTotalSalesAmount(): number {
    return this.allSales().reduce((sum, sale) => sum + sale.total, 0);
  }

  getPaymentMethodName(method: string): string {
    const methods: { [key: string]: string } = {
      'efectivo': 'Efectivo',
      'tarjeta': 'Tarjeta',
      'yape': 'Yape',
      'plin': 'Plin'
    };
    return methods[method] || method;
  }

  exportData(): void {
    const selectedDate = new Date(this.selectedDate() + 'T00:00:00');
    const dateStr = this.selectedDate();

    const data = {
      summary: this.dailySummary(),
      sales: this.filteredSales(),
      exportDate: new Date().toISOString(),
      selectedDate: dateStr
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ventas-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
