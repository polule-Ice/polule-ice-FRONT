import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InventoryItem {
  id: string;
  name: string;
  category: 'bases' | 'insumos' | 'toppings';
  unit: 'ml' | 'unidades' | 'gramos';
  currentStock: number;
  unitSize: number;
  pricePerUnit: number;
  // Para bases de helado
  boxSize?: number;
  openBags?: number;
  bagsOpenedToday?: number;
  mlLeftoverYesterday?: number;
}

@Component({
  selector: 'app-pos-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-gray-50 overflow-y-auto" style="height: calc(100vh - 80px);">

      <!-- Acciones Principales -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <button (click)="showOpenBagsModal = true" class="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-xl shadow transition-all">
          <div class="flex items-center gap-4">
            <span class="text-4xl">🧊</span>
            <div class="text-left">
              <p class="font-bold text-lg">Abrir Bolsitas</p>
              <p class="text-sm text-blue-100">Durante el día</p>
            </div>
          </div>
        </button>
        <button (click)="showCloseDayModal = true" class="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-xl shadow transition-all">
          <div class="flex items-center gap-4">
            <span class="text-4xl">🌙</span>
            <div class="text-left">
              <p class="font-bold text-lg">Cerrar Día</p>
              <p class="text-sm text-purple-100">Registrar sobrante</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-3 mb-4">
        <div class="flex gap-2">
          <button (click)="activeTab = ''" [class.bg-blue-50]="activeTab === ''" [class.text-blue-700]="activeTab === ''" class="px-4 py-2 rounded-lg font-medium text-sm transition-colors">📋 Todos</button>
          <button (click)="activeTab = 'bases'" [class.bg-blue-50]="activeTab === 'bases'" [class.text-blue-700]="activeTab === 'bases'" class="px-4 py-2 rounded-lg font-medium text-sm transition-colors">🧊 Bases</button>
          <button (click)="activeTab = 'insumos'" [class.bg-blue-50]="activeTab === 'insumos'" [class.text-blue-700]="activeTab === 'insumos'" class="px-4 py-2 rounded-lg font-medium text-sm transition-colors">🥤 Insumos</button>
          <button (click)="activeTab = 'toppings'" [class.bg-blue-50]="activeTab === 'toppings'" [class.text-blue-700]="activeTab === 'toppings'" class="px-4 py-2 rounded-lg font-medium text-sm transition-colors">🍬 Toppings</button>
          <div class="flex-1"></div>
          <button (click)="showPurchaseModal = true" class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">+ Compra</button>
        </div>
      </div>

      <!-- Tabla de Inventario -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Producto</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cajas / Stock</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Bolsitas Listas</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Precio</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody>
            @for (item of getFiltered(); track item.id) {
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <p class="font-semibold text-gray-800">{{ item.name }}</p>
                  @if (item.category === 'bases') {
                    <p class="text-xs text-gray-500">{{ item.boxSize }} bolsitas de {{ item.unitSize }}ml</p>
                  } @else {
                    <p class="text-xs text-gray-500">{{ item.unitSize }} {{ item.unit }}</p>
                  }
                </td>
                <td class="px-6 py-4">
                  @if (item.category === 'bases') {
                    <div class="flex items-center gap-2">
                      <button (click)="adjustStock(item.id, -1)" [disabled]="item.currentStock <= 0" class="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-700 rounded font-bold disabled:opacity-30">−</button>
                      <div class="text-center min-w-[60px]">
                        <p class="text-2xl font-bold" [class.text-red-600]="item.currentStock <= 1" [class.text-gray-800]="item.currentStock > 1">{{ item.currentStock }}</p>
                        <p class="text-xs text-gray-600">cajas</p>
                      </div>
                      <button (click)="adjustStock(item.id, 1)" class="w-7 h-7 bg-green-100 hover:bg-green-200 text-green-700 rounded font-bold">+</button>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2">
                      <button (click)="adjustStock(item.id, -1)" [disabled]="item.currentStock <= 0" class="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-700 rounded font-bold disabled:opacity-30">−</button>
                      <div class="text-center min-w-[60px]">
                        <p class="text-xl font-bold text-gray-800">{{ item.currentStock }}</p>
                        <p class="text-xs text-gray-600">{{ item.unit }}</p>
                      </div>
                      <button (click)="adjustStock(item.id, 1)" class="w-7 h-7 bg-green-100 hover:bg-green-200 text-green-700 rounded font-bold">+</button>
                    </div>
                  }
                </td>
                <td class="px-6 py-4">
                  @if (item.category === 'bases') {
                    <div>
                      <div class="flex items-center gap-2">
                        <div class="bg-blue-50 px-3 py-2 rounded-lg">
                          <p class="text-2xl font-bold text-blue-600">{{ item.openBags || 0 }}</p>
                          <p class="text-xs text-gray-600">listas</p>
                        </div>
                        <div class="flex gap-1">
                          <button (click)="openBags(item.id, 1)" [disabled]="item.currentStock <= 0" class="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-bold disabled:opacity-30">+1</button>
                          <button (click)="openBags(item.id, 2)" [disabled]="item.currentStock <= 0" class="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-bold disabled:opacity-30">+2</button>
                        </div>
                      </div>
                      @if (item.bagsOpenedToday && item.bagsOpenedToday > 0) {
                        <p class="text-xs text-blue-600 font-semibold mt-2">📝 Hoy: +{{ item.bagsOpenedToday }}</p>
                      }
                      @if (item.mlLeftoverYesterday && item.mlLeftoverYesterday > 0) {
                        <p class="text-xs text-purple-600 font-semibold">🌙 Ayer: {{ (item.mlLeftoverYesterday / 1000).toFixed(1) }}L</p>
                      }
                    </div>
                  } @else {
                    <span class="text-gray-400">-</span>
                  }
                </td>
                <td class="px-6 py-4">
                  <p class="text-lg font-bold text-green-600">S/ {{ item.pricePerUnit.toFixed(2) }}</p>
                  @if (item.category === 'bases') {
                    <p class="text-xs text-gray-500">por caja</p>
                  } @else {
                    <p class="text-xs text-gray-500">por {{ item.unit }}</p>
                  }
                </td>
                <td class="px-6 py-4">
                  @if (item.currentStock === 0) {
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">⚠️ Sin stock</span>
                  } @else if (item.currentStock <= 2 && item.category === 'bases') {
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">🔔 Stock bajo</span>
                  } @else {
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">✓ OK</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Modal: Abrir Bolsitas -->
      @if (showOpenBagsModal) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" (click)="showOpenBagsModal = false">
          <div class="bg-white rounded-xl p-6 max-w-md w-full" (click)="$event.stopPropagation()">
            <h3 class="text-xl font-bold mb-4">🧊 Abrir Bolsitas</h3>

            <select [(ngModel)]="openBagsForm.baseId" class="w-full p-3 border rounded-lg mb-4">
              <option value="">Seleccionar base...</option>
              @for (base of getBases(); track base.id) {
                <option [value]="base.id">{{ base.name }}</option>
              }
            </select>

            @if (openBagsForm.baseId) {
              <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <p class="text-sm text-gray-600">Cajas disponibles</p>
                <p class="text-3xl font-bold">{{ getBase(openBagsForm.baseId)?.currentStock }}</p>
              </div>

              <div class="grid grid-cols-4 gap-2 mb-4">
                @for (num of [1,2,3,5]; track num) {
                  <button (click)="openBagsForm.quantity = num" [class.bg-blue-500]="openBagsForm.quantity === num" [class.text-white]="openBagsForm.quantity === num" [class.bg-gray-100]="openBagsForm.quantity !== num" class="py-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white">{{ num }}</button>
                }
              </div>
            }

            <div class="flex gap-3">
              <button (click)="showOpenBagsModal = false" class="flex-1 py-2 border rounded-lg">Cancelar</button>
              <button (click)="submitOpenBags()" [disabled]="!openBagsForm.baseId || !openBagsForm.quantity" class="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-30">Abrir {{ openBagsForm.quantity || 0 }}</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal: Cerrar Día -->
      @if (showCloseDayModal) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" (click)="showCloseDayModal = false">
          <div class="bg-white rounded-xl p-6 max-w-lg w-full" (click)="$event.stopPropagation()">
            <h3 class="text-xl font-bold mb-4">🌙 Cerrar Día</h3>

            <select [(ngModel)]="closeDayForm.baseId" class="w-full p-3 border rounded-lg mb-4">
              <option value="">Seleccionar base...</option>
              @for (base of getBases(); track base.id) {
                <option [value]="base.id">{{ base.name }}</option>
              }
            </select>

            @if (closeDayForm.baseId && getBase(closeDayForm.baseId)) {
              <div class="bg-purple-50 p-4 rounded-lg mb-4 space-y-3">
                <h4 class="font-semibold">📊 Resumen del Día</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-white p-3 rounded">
                    <p class="text-xs text-gray-600">Abiertas hoy</p>
                    <p class="text-2xl font-bold text-blue-600">{{ getBase(closeDayForm.baseId)!.bagsOpenedToday || 0 }}</p>
                  </div>
                  <div class="bg-white p-3 rounded">
                    <p class="text-xs text-gray-600">De ayer</p>
                    <p class="text-xl font-bold text-green-600">{{ ((getBase(closeDayForm.baseId)!.mlLeftoverYesterday || 0) / 1000).toFixed(2) }}L</p>
                  </div>
                </div>
                <div class="bg-blue-100 p-3 rounded">
                  <p class="text-xs">Total disponible hoy</p>
                  <p class="text-3xl font-bold text-blue-700">{{ getTotalAvailable(getBase(closeDayForm.baseId)!) }}L</p>
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-semibold mb-2">¿Cuánto sobró? (ml)</label>
                <input type="number" [(ngModel)]="closeDayForm.leftoverMl" min="0" step="100" placeholder="Ej: 1500" class="w-full p-3 border rounded-lg text-2xl font-bold text-center">
                <p class="text-xs text-gray-500 mt-1 text-center">≈ {{ (closeDayForm.leftoverMl / 1000).toFixed(2) }} litros</p>
              </div>

              @if (closeDayForm.leftoverMl > 0) {
                <div class="bg-green-50 p-3 rounded-lg mb-4">
                  <p class="text-sm font-semibold mb-2">💡 Cálculo</p>
                  <div class="text-xs space-y-1">
                    <div class="flex justify-between">
                      <span>Consumo real:</span>
                      <span class="font-bold text-green-700">{{ getRealConsumption(getBase(closeDayForm.baseId)!, closeDayForm.leftoverMl) }}L</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Para mañana:</span>
                      <span class="font-bold text-purple-700">{{ (closeDayForm.leftoverMl / 1000).toFixed(2) }}L</span>
                    </div>
                  </div>
                </div>
              }
            }

            <div class="flex gap-3">
              <button (click)="showCloseDayModal = false" class="flex-1 py-2 border rounded-lg">Cancelar</button>
              <button (click)="submitCloseDay()" [disabled]="!closeDayForm.baseId || closeDayForm.leftoverMl < 0" class="flex-1 py-2 bg-purple-500 text-white rounded-lg font-semibold disabled:opacity-30">Cerrar Día</button>
            </div>
          </div>
        </div>
      }

      <!-- Modal: Compra -->
      @if (showPurchaseModal) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" (click)="showPurchaseModal = false">
          <div class="bg-white rounded-xl p-6 max-w-md w-full" (click)="$event.stopPropagation()">
            <h3 class="text-xl font-bold mb-4">📦 Nueva Compra</h3>

            <select [(ngModel)]="purchaseForm.itemId" class="w-full p-3 border rounded-lg mb-4">
              <option value="">Seleccionar...</option>
              @for (item of inventory(); track item.id) {
                <option [value]="item.id">{{ item.name }}</option>
              }
            </select>

            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label class="block text-sm font-semibold mb-2">Cantidad</label>
                <input type="number" [(ngModel)]="purchaseForm.quantity" min="1" class="w-full p-3 border rounded-lg text-xl font-bold text-center">
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Precio S/</label>
                <input type="number" [(ngModel)]="purchaseForm.price" step="0.01" min="0" class="w-full p-3 border rounded-lg text-xl font-bold text-center">
              </div>
            </div>

            @if (purchaseForm.quantity > 0 && purchaseForm.price > 0) {
              <div class="bg-gray-50 p-3 rounded-lg mb-4">
                <div class="flex justify-between">
                  <span class="text-sm">Total:</span>
                  <span class="text-2xl font-bold">S/ {{ (purchaseForm.quantity * purchaseForm.price).toFixed(2) }}</span>
                </div>
              </div>
            }

            <div class="flex gap-3">
              <button (click)="showPurchaseModal = false" class="flex-1 py-2 border rounded-lg">Cancelar</button>
              <button (click)="submitPurchase()" [disabled]="!purchaseForm.itemId || purchaseForm.quantity <= 0 || purchaseForm.price <= 0" class="flex-1 py-2 bg-green-500 text-white rounded-lg font-semibold disabled:opacity-30">Registrar</button>
            </div>
          </div>
        </div>
      }

      <!-- Toast -->
      @if (toast.show) {
        <div class="fixed bottom-6 right-6 z-50 animate-slide-in">
          <div class="bg-green-500 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 text-white">
            <span class="text-2xl">✅</span>
            <p class="font-semibold">{{ toast.message }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in { animation: slide-in 0.3s ease-out; }
  `]
})
export class PosInventoryComponent implements OnInit {
  activeTab = '';
  showOpenBagsModal = false;
  showCloseDayModal = false;
  showPurchaseModal = false;

  openBagsForm = { baseId: '', quantity: 0 };
  closeDayForm = { baseId: '', leftoverMl: 0 };
  purchaseForm = { itemId: '', quantity: 0, price: 0 };

  toast = { show: false, message: '' };

  inventory = signal<InventoryItem[]>([
    {
      id: '1',
      name: 'Base Vainilla',
      category: 'bases',
      unit: 'ml',
      currentStock: 4,
      unitSize: 946,
      pricePerUnit: 450,
      boxSize: 10,
      openBags: 3,
      bagsOpenedToday: 0,
      mlLeftoverYesterday: 0
    },
    {
      id: '2',
      name: 'Base Chocolate',
      category: 'bases',
      unit: 'ml',
      currentStock: 2,
      unitSize: 946,
      pricePerUnit: 480,
      boxSize: 10,
      openBags: 1,
      bagsOpenedToday: 0,
      mlLeftoverYesterday: 0
    },
    {
      id: '4',
      name: 'Vasos',
      category: 'insumos',
      unit: 'unidades',
      currentStock: 500,
      unitSize: 1,
      pricePerUnit: 0.20
    },
    {
      id: '5',
      name: 'Cucharitas',
      category: 'insumos',
      unit: 'unidades',
      currentStock: 800,
      unitSize: 1,
      pricePerUnit: 0.15
    },
    {
      id: '9',
      name: 'Chispas de Chocolate',
      category: 'toppings',
      unit: 'gramos',
      currentStock: 800,
      unitSize: 100,
      pricePerUnit: 0.8
    }
  ]);

  ngOnInit() {}

  getFiltered() {
    if (this.activeTab === '') return this.inventory();
    return this.inventory().filter(i => i.category === this.activeTab);
  }

  getBases() {
    return this.inventory().filter(i => i.category === 'bases');
  }

  getBase(id: string) {
    return this.inventory().find(i => i.id === id);
  }

  adjustStock(id: string, amount: number) {
    this.inventory.update(items =>
      items.map(i => i.id === id ? { ...i, currentStock: Math.max(0, i.currentStock + amount) } : i)
    );
    this.showToast(`Stock ${amount > 0 ? 'agregado' : 'reducido'}`);
  }

  openBags(id: string, count: number) {
    this.inventory.update(items =>
      items.map(i =>
        i.id === id
          ? {
              ...i,
              currentStock: i.currentStock - 1,
              openBags: (i.openBags || 0) + count,
              bagsOpenedToday: (i.bagsOpenedToday || 0) + count
            }
          : i
      )
    );
    this.showToast(`${count} bolsita${count > 1 ? 's' : ''} lista${count > 1 ? 's' : ''}`);
  }

  submitOpenBags() {
    const base = this.getBase(this.openBagsForm.baseId);
    if (!base) return;

    const boxesToConsume = Math.ceil(this.openBagsForm.quantity / (base.boxSize || 10));

    this.inventory.update(items =>
      items.map(i =>
        i.id === this.openBagsForm.baseId
          ? {
              ...i,
              currentStock: i.currentStock - boxesToConsume,
              openBags: (i.openBags || 0) + this.openBagsForm.quantity,
              bagsOpenedToday: (i.bagsOpenedToday || 0) + this.openBagsForm.quantity
            }
          : i
      )
    );

    this.showToast(`${this.openBagsForm.quantity} bolsitas listas ✨`);
    this.showOpenBagsModal = false;
    this.openBagsForm = { baseId: '', quantity: 0 };
  }

  getTotalAvailable(base: InventoryItem) {
    const mlToday = (base.bagsOpenedToday || 0) * base.unitSize;
    const mlYesterday = base.mlLeftoverYesterday || 0;
    return ((mlToday + mlYesterday) / 1000).toFixed(2);
  }

  getRealConsumption(base: InventoryItem, leftoverMl: number) {
    const mlToday = (base.bagsOpenedToday || 0) * base.unitSize;
    const mlYesterday = base.mlLeftoverYesterday || 0;
    const total = mlToday + mlYesterday;
    return ((total - leftoverMl) / 1000).toFixed(2);
  }

  submitCloseDay() {
    const base = this.getBase(this.closeDayForm.baseId);
    if (!base) return;

    const leftoverBags = Math.floor(this.closeDayForm.leftoverMl / base.unitSize);
    const consumptionL = this.getRealConsumption(base, this.closeDayForm.leftoverMl);

    this.inventory.update(items =>
      items.map(i =>
        i.id === this.closeDayForm.baseId
          ? {
              ...i,
              openBags: leftoverBags,
              mlLeftoverYesterday: this.closeDayForm.leftoverMl,
              bagsOpenedToday: 0
            }
          : i
      )
    );

    this.showToast(`Día cerrado: ${consumptionL}L consumidos 📊`);
    this.showCloseDayModal = false;
    this.closeDayForm = { baseId: '', leftoverMl: 0 };
  }

  submitPurchase() {
    this.inventory.update(items =>
      items.map(i =>
        i.id === this.purchaseForm.itemId
          ? { ...i, currentStock: i.currentStock + this.purchaseForm.quantity, pricePerUnit: this.purchaseForm.price }
          : i
      )
    );

    const total = this.purchaseForm.quantity * this.purchaseForm.price;
    this.showToast(`Compra registrada: S/ ${total.toFixed(2)} 💰`);
    this.showPurchaseModal = false;
    this.purchaseForm = { itemId: '', quantity: 0, price: 0 };
  }

  showToast(message: string) {
    this.toast = { show: true, message };
    setTimeout(() => (this.toast.show = false), 3000);
  }
}
