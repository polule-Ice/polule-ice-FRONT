import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shop/models/shop.models';
import { SaleItem } from '../../models/sale.interface';

@Component({
  selector: 'app-product-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-5">
      <h2 class="text-xl font-bold text-chocolate mb-4 flex items-center gap-2">
        <span class="text-2xl">🍦</span>
        <span>Seleccionar Productos</span>
      </h2>

      <!-- Product Grid -->
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        @for (product of filteredProducts(); track product.id) {
          <div
            (click)="openModal(product)"
            class="bg-white border-2 border-gray-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-amarilloMango hover:-translate-y-1 active:scale-95"
          >
            <div class="aspect-square mb-2 overflow-hidden rounded-md bg-gray-50">
              <img
                [src]="product.image"
                [alt]="product.name"
                class="w-full h-full object-cover"
              >
            </div>
            <h3 class="font-semibold text-chocolate text-xs leading-tight mb-1 line-clamp-2">{{ product.name }}</h3>
            <p class="text-green-600 font-bold text-sm">S/ {{ product.price }}</p>
          </div>
        }
      </div>
    </div>

    <!-- Modal for Product Configuration -->
    @if (showModal && selectedProduct) {
      <div
        class="fixed inset-0 flex items-center justify-center z-50 p-4"
        style="background-color: rgba(0,0,0,.4);"
        (click)="closeModal()"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto"
          (click)="$event.stopPropagation()"
        >
          <!-- Modal Header -->
          <div class="bg-blue-500 p-4 sm:p-6 rounded-t-2xl sticky top-0 z-10">
            <div class="flex justify-between items-start gap-4">
              <div class="flex-1">
                <h2 class="text-xl sm:text-2xl font-bold text-white mb-1">{{ selectedProduct.name }}</h2>
                <p class="text-white/90 text-sm sm:text-base font-semibold">Precio: S/ {{ selectedProduct.price.toFixed(2) }}</p>
              </div>
              <button
                (click)="closeModal()"
                class="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-2xl cursor-pointer flex-shrink-0"
              >
                ×
              </button>
            </div>
          </div>

          <div class="p-4 sm:p-6 space-y-6">
            <!-- Flavor Selection -->
            <div>
              <h3 class="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>🍦</span>
                <span>Selecciona el Sabor</span>
              </h3>
              <div class="grid grid-cols-3 gap-2">
                @for (flavor of iceCreamFlavors; track flavor) {
                  <button
                    (click)="selectedFlavor = flavor"
                    class="p-3 sm:p-4 rounded-lg border-2 text-sm sm:text-base font-semibold transition-all cursor-pointer active:scale-95"
                    [class.border-blue-500]="selectedFlavor === flavor"
                    [class.bg-blue-500]="selectedFlavor === flavor"
                    [class.text-white]="selectedFlavor === flavor"
                    [class.border-gray-300]="selectedFlavor !== flavor"
                  >
                    <div class="text-lg sm:text-xl mb-1">{{ getFlavorIcon(flavor) }}</div>
                    <div class="text-xs sm:text-sm">{{ flavor }}</div>
                  </button>
                }
              </div>
            </div>

            <!-- Size Selection -->
            @if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
              <div>
                <h3 class="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📏</span>
                  <span>Selecciona el Tamaño</span>
                </h3>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    (click)="selectSize('', selectedProduct.price)"
                    class="p-3 sm:p-4 rounded-lg border-2 font-semibold transition-all cursor-pointer active:scale-95"
                    [class.border-blue-500]="selectedSize === ''"
                    [class.bg-blue-500]="selectedSize === ''"
                    [class.text-white]="selectedSize === ''"
                    [class.border-gray-300]="selectedSize !== ''"
                  >
                    <div class="text-sm sm:text-base">Regular</div>
                    <div class="text-base sm:text-lg font-bold" [class.text-white]="selectedSize === ''" [class.text-green-600]="selectedSize !== ''">
                      S/ {{ selectedProduct.price.toFixed(2) }}
                    </div>
                  </button>
                  @for (size of selectedProduct.sizes; track size.name) {
                    <button
                      (click)="selectSize(size.name, size.price)"
                      class="p-3 sm:p-4 rounded-lg border-2 font-semibold transition-all cursor-pointer active:scale-95"
                      [class.border-blue-500]="selectedSize === size.name"
                      [class.bg-blue-500]="selectedSize === size.name"
                      [class.text-white]="selectedSize === size.name"
                      [class.border-gray-300]="selectedSize !== size.name"
                    >
                      <div class="text-sm sm:text-base">{{ size.name }}</div>
                      <div class="text-base sm:text-lg font-bold" [class.text-white]="selectedSize === size.name" [class.text-green-600]="selectedSize !== size.name">
                        S/ {{ size.price.toFixed(2) }}
                      </div>
                    </button>
                  }
                </div>
              </div>
            }

            <!-- Quantity Selection -->
            <div>
              <h3 class="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>🔢</span>
                <span>Cantidad</span>
              </h3>
              <div class="flex items-center justify-center gap-4">
                <button
                  (click)="quantity = Math.max(1, quantity - 1)"
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-xl rounded-lg font-bold cursor-pointer transition-colors"
                >
                  −
                </button>
                <div class="w-16 h-12 sm:w-20 sm:h-14 bg-gray-100 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-800">
                  {{ quantity }}
                </div>
                <button
                  (click)="quantity = quantity + 1"
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xl rounded-lg font-bold cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Toppings Selection -->
            @if (availableToppings().length > 0) {
              <div>
                <h3 class="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🍬</span>
                  <span>Toppings <span class="text-sm font-normal text-gray-500">(Opcional)</span></span>
                </h3>
                <div class="grid grid-cols-2 gap-2">
                  @for (topping of availableToppings(); track topping.id) {
                    <button
                      (click)="toggleTopping(topping)"
                      class="p-3 rounded-lg border-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95"
                      [class.border-green-500]="isToppingSelected(topping)"
                      [class.bg-green-500]="isToppingSelected(topping)"
                      [class.text-white]="isToppingSelected(topping)"
                      [class.border-gray-300]="!isToppingSelected(topping)"
                    >
                      <div class="flex justify-between items-center gap-2">
                        <span class="truncate">{{ topping.name.replace('Topping ', '') }}</span>
                        <span class="text-xs flex-shrink-0" [class.text-white]="isToppingSelected(topping)" [class.text-green-600]="!isToppingSelected(topping)">
                          +S/ {{ topping.price.toFixed(2) }}
                        </span>
                      </div>
                    </button>
                  }
                </div>
                @if (selectedToppings.length > 0) {
                  <div class="mt-3 px-3 py-2 bg-green-50 rounded-lg text-sm font-medium text-green-700 flex justify-between">
                    <span>{{ selectedToppings.length }} topping(s)</span>
                    <span>+S/ {{ getToppingsTotal() }}</span>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Total and Add Button (Sticky Footer) -->
          <div class="sticky bottom-0 bg-white border-t p-4 sm:p-6 rounded-b-2xl">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg sm:text-xl font-bold text-gray-800">TOTAL:</span>
              <span class="text-2xl sm:text-3xl font-bold text-green-600">S/ {{ getTotal().toFixed(2) }}</span>
            </div>
            <button
              (click)="addToSale()"
              [disabled]="!selectedFlavor"
              class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold cursor-pointer transition-colors"
            >
              {{ selectedFlavor ? '✓ Agregar a la Venta' : '⚠️ Selecciona un sabor' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class ProductSelectorComponent {
  @Input() set products(value: Product[]) {
    this._products.set(value);
  }

  @Output() productAdded = new EventEmitter<SaleItem>();

  private _products = signal<Product[]>([]);

  // Filtrar productos para excluir toppings
  filteredProducts = computed(() =>
    this._products().filter(p => p.category !== 'toppings')
  );

  // Obtener solo los toppings
  availableToppings = computed(() =>
    this._products().filter(p => p.category === 'toppings')
  );

  showModal = false;
  selectedProduct: Product | null = null;
  selectedFlavor: string = '';
  selectedSize: string = '';
  selectedPrice: number = 0;
  selectedToppings: Product[] = [];
  quantity: number = 1;
  Math = Math;

  iceCreamFlavors = [
    'Vainilla',
    'Chocolate',
    'Combinado'
  ];

  getFlavorIcon(flavor: string): string {
    const icons: { [key: string]: string } = {
      'Vainilla': '🤍',
      'Chocolate': '🤎',
      'Combinado': '🍦'
    };
    return icons[flavor] || '🍦';
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.selectedFlavor = '';
    this.selectedSize = '';
    this.selectedPrice = product.price;
    this.quantity = 1;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.clearSelection();
  }

  selectSize(sizeName: string, price: number): void {
    this.selectedSize = sizeName;
    this.selectedPrice = price;
  }

  getTotal(): number {
    const toppingsPrice = this.selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return (this.selectedPrice + toppingsPrice) * this.quantity;
  }

  getToppingsTotal(): string {
    return this.selectedToppings.reduce((sum, t) => sum + t.price, 0).toFixed(2);
  }

  toggleTopping(topping: Product): void {
    const index = this.selectedToppings.findIndex(t => t.id === topping.id);
    if (index >= 0) {
      this.selectedToppings.splice(index, 1);
    } else {
      this.selectedToppings.push(topping);
    }
  }

  isToppingSelected(topping: Product): boolean {
    return this.selectedToppings.some(t => t.id === topping.id);
  }

  addToSale(): void {
    if (!this.selectedProduct || !this.selectedFlavor || this.quantity <= 0) {
      return;
    }

    const sizeName = this.selectedSize || 'Regular';

    const saleItem: SaleItem = {
      id: '',
      productId: this.selectedProduct.id,
      productName: this.selectedProduct.name,
      flavor: this.selectedFlavor,
      size: sizeName,
      quantity: this.quantity,
      unitPrice: this.selectedPrice,
      totalPrice: this.getTotal()
    };

    this.productAdded.emit(saleItem);
    this.closeModal();
  }

  clearSelection(): void {
    this.selectedProduct = null;
    this.selectedFlavor = '';
    this.selectedSize = '';
    this.selectedPrice = 0;
    this.selectedToppings = [];
    this.quantity = 1;
  }
}
