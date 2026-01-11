import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleItem } from '../../models/sale.interface';

@Component({
  selector: 'app-current-sale',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6 sticky top-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-chocolate">Venta Actual</h2>
        @if (totalItems > 0) {
          <span class="bg-amarilloMango text-chocolate px-2 py-1 rounded-full text-sm font-semibold">
            {{ totalItems }} items
          </span>
        }
      </div>

      @if (items.length === 0) {
        <div class="text-center py-8 text-gray-500">
          <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005 16v3a1 1 0 001 1h12a1 1 0 001-1v-3a1 1 0 00-.293-.707L17 13M7 13v5a2 2 0 002 2h6a2 2 0 002-2v-5"></path>
          </svg>
          <p>No hay productos</p>
          <p class="text-sm">Selecciona productos para comenzar</p>
        </div>
      } @else {
        <!-- Sale Items -->
        <div class="space-y-3 mb-6 max-h-80 overflow-y-auto">
          @for (item of items; track item.id) {
            <div class="border border-gray-200 rounded-lg p-3">
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                  <h4 class="font-semibold text-sm">{{ item.productName }}</h4>
                  <p class="text-xs text-gray-600">{{ item.flavor }}</p>
                  @if (item.size !== 'Regular') {
                    <p class="text-xs text-gray-600">{{ item.size }}</p>
                  }
                </div>
                <button
                  (click)="onRemoveItem(item.id)"
                  class="text-red-500 hover:text-red-700 p-1"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <button
                    (click)="onUpdateQuantity(item.id, item.quantity - 1)"
                    class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span class="text-sm font-medium">{{ item.quantity }}</span>
                  <button
                    (click)="onUpdateQuantity(item.id, item.quantity + 1)"
                    class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
                <span class="font-bold text-chocolate">S/ {{ item.totalPrice.toFixed(2) }}</span>
              </div>
            </div>
          }
        </div>

        <!-- Total -->
        <div class="border-t pt-4 mb-4">
          <div class="flex justify-between text-lg font-bold text-chocolate">
            <span>TOTAL:</span>
            <span>S/ {{ total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <button
            (click)="onProceedToPayment()"
            class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            💳 Procesar Pago
          </button>
          <button
            (click)="onCancelSale()"
            class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
          >
            ❌ Cancelar Venta
          </button>
        </div>
      }
    </div>
  `
})
export class CurrentSaleComponent {
  @Input() items: SaleItem[] = [];
  @Input() total: number = 0;
  @Input() totalItems: number = 0;

  @Output() removeItem = new EventEmitter<string>();
  @Output() updateQuantity = new EventEmitter<{id: string, quantity: number}>();
  @Output() proceedToPayment = new EventEmitter<void>();
  @Output() cancelSale = new EventEmitter<void>();

  onRemoveItem(itemId: string): void {
    this.removeItem.emit(itemId);
  }

  onUpdateQuantity(itemId: string, quantity: number): void {
    this.updateQuantity.emit({ id: itemId, quantity });
  }

  onProceedToPayment(): void {
    this.proceedToPayment.emit();
  }

  onCancelSale(): void {
    if (confirm('¿Estás seguro de cancelar esta venta?')) {
      this.cancelSale.emit();
    }
  }
}
