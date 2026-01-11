import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-pos-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 p-6">
      <!-- Header con fecha y hora -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-1">Panel de Control</h1>
            <p class="text-gray-500 text-sm">{{ currentDateTime }}</p>
          </div>
          <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <p class="text-xs text-gray-500 mb-1">Turno Actual</p>
            <p class="text-sm font-semibold text-gray-700">10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      <!-- Resumen de rendimiento del día -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-base font-semibold text-gray-800 flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <span class="text-lg">🎯</span>
            </div>
            Meta del Día
          </h2>
          <span class="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">Meta: S/ 1,500</span>
        </div>

        <div class="flex items-end justify-between mb-3">
          <div>
            <p class="text-xs text-gray-500 mb-1">Progreso Actual</p>
            <p class="text-3xl font-bold text-gray-800">S/ {{ todayRevenue().toFixed(2) }}</p>
          </div>
          <p class="text-2xl font-bold" [class]="goalProgress() >= 100 ? 'text-green-600' : 'text-blue-600'">
            {{ goalProgress().toFixed(0) }}%
          </p>
        </div>

        <div class="mb-4">
          <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700 ease-out"
              [class]="goalProgress() >= 100 ? 'bg-green-500' : 'bg-blue-500'"
              [style.width.%]="goalProgress() > 100 ? 100 : goalProgress()">
            </div>
          </div>
        </div>

        @if (goalProgress() >= 100) {
          <div class="bg-green-50 border border-green-200 px-4 py-2.5 rounded-lg">
            <p class="text-sm text-green-700 font-medium flex items-center gap-2">
              <span>✓</span> Meta alcanzada
            </p>
          </div>
        } @else {
          <p class="text-sm text-gray-600">
            Faltan <span class="font-semibold text-gray-800">S/ {{ (1500 - todayRevenue()).toFixed(2) }}</span> para alcanzar la meta
          </p>
        }
      </div>

      <!-- Estadísticas principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- Ventas -->
        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-lg hover:border-green-200 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <div class="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
              <span class="text-2xl">💰</span>
            </div>
            <div class="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-lg">
              +12%
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Ingresos Hoy</p>
          <p class="text-4xl font-bold text-gray-900 mb-0.5 leading-none">S/ {{ todayRevenue().toFixed(0) }}</p>
          <p class="text-xs text-gray-400 mt-1.5">vs ayer: <span class="font-semibold text-gray-600">S/ {{ yesterdayRevenue.toFixed(0) }}</span></p>
        </div>

        <!-- Órdenes -->
        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <div class="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
              <span class="text-2xl">📝</span>
            </div>
            <div class="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">
              +8%
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Órdenes</p>
          <p class="text-4xl font-bold text-gray-900 mb-0.5 leading-none">{{ todaySalesCount() }}</p>
          <p class="text-xs text-gray-400 mt-1.5">Ticket promedio: <span class="font-semibold text-gray-600">S/ {{ averageTicket().toFixed(2) }}</span></p>
        </div>

        <!-- Productos vendidos -->
        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-lg hover:border-pink-200 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <div class="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center">
              <span class="text-2xl">🍨</span>
            </div>
            <div class="bg-pink-100 text-pink-700 text-xs font-bold px-2.5 py-1 rounded-lg">
              +15%
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Productos Vendidos</p>
          <p class="text-4xl font-bold text-gray-900 mb-0.5 leading-none">{{ totalItemsSold() }}</p>
          <p class="text-xs text-gray-400 mt-1.5">Promedio por orden: <span class="font-semibold text-gray-600">{{ itemsPerSale().toFixed(1) }}</span></p>
        </div>

        <!-- Hora pico -->
        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <div class="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center">
              <span class="text-2xl">⏰</span>
            </div>
            <div class="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-lg">
              Pico
            </div>
          </div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Hora Pico</p>
          <p class="text-4xl font-bold text-gray-900 mb-0.5 leading-none">{{ peakHour }}</p>
          <p class="text-xs text-gray-400 mt-1.5"><span class="font-semibold text-gray-600">{{ peakHourSales }}</span> ventas realizadas</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <!-- Métodos de pago -->
        <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div class="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
              <span class="text-sm">💳</span>
            </div>
            Métodos de Pago
          </h3>
          <div class="space-y-3.5">
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-sm text-gray-700">Yape/Plin</span>
                <span class="text-sm font-semibold text-purple-600">45%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-purple-500 rounded-full transition-all duration-500" style="width: 45%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-sm text-gray-700">Efectivo</span>
                <span class="text-sm font-semibold text-green-600">35%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 rounded-full transition-all duration-500" style="width: 35%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-sm text-gray-700">Tarjeta</span>
                <span class="text-sm font-semibold text-blue-600">20%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full transition-all duration-500" style="width: 20%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Productos más vendidos -->
        <div class="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
          <h3 class="text-lg font-bold text-chocolate mb-5 flex items-center gap-2">
            <span class="text-2xl">🏆</span>
            Top Productos del Día
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border-l-4 border-yellow-500">
              <div class="flex items-center gap-4">
                <div class="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-lg">1</div>
                <div>
                  <p class="font-bold text-chocolate text-base">Cono de Vainilla</p>
                  <p class="text-xs text-chocolate/60">Helado Clásico</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-yellow-700 text-lg">52 und</p>
                <p class="text-xs text-chocolate/60">S/ 312</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-gray-400">
              <div class="flex items-center gap-4">
                <div class="bg-gray-400 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-lg">2</div>
                <div>
                  <p class="font-bold text-chocolate text-base">Sundae de Chocolate</p>
                  <p class="text-xs text-chocolate/60">Postre Especial</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-700 text-lg">38 und</p>
                <p class="text-xs text-chocolate/60">S/ 418</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-400">
              <div class="flex items-center gap-4">
                <div class="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-lg">3</div>
                <div>
                  <p class="font-bold text-chocolate text-base">Cono Combinado</p>
                  <p class="text-xs text-chocolate/60">Helado Doble Sabor</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-orange-700 text-lg">31 und</p>
                <p class="text-xs text-chocolate/60">S/ 217</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-chocolate/20">
              <div class="flex items-center gap-4">
                <div class="bg-chocolate/20 w-12 h-12 rounded-full flex items-center justify-center text-chocolate font-bold text-lg">4</div>
                <div>
                  <p class="font-semibold text-chocolate text-base">Copa de Fresa</p>
                  <p class="text-xs text-chocolate/60">Postre de Temporada</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-chocolate text-lg">24 und</p>
                <p class="text-xs text-chocolate/60">S/ 168</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-chocolate/20">
              <div class="flex items-center gap-4">
                <div class="bg-chocolate/20 w-12 h-12 rounded-full flex items-center justify-center text-chocolate font-bold text-lg">5</div>
                <div>
                  <p class="font-semibold text-chocolate text-base">Sundae de Vainilla</p>
                  <p class="text-xs text-chocolate/60">Postre Clásico</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-chocolate text-lg">19 und</p>
                <p class="text-xs text-chocolate/60">S/ 209</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alertas y actividad reciente -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <!-- Alertas -->
        <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div class="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
              <span class="text-sm">⚠️</span>
            </div>
            Alertas e Inventario
          </h3>
          <div class="space-y-2.5">
            <div class="bg-red-50 border-l-3 border-red-400 p-3 rounded-lg">
              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 bg-red-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-red-600 text-xs">!</span>
                </div>
                <div>
                  <p class="font-medium text-red-900 text-sm">Stock Bajo</p>
                  <p class="text-xs text-red-700 mt-0.5">Conos de barquillo: solo quedan 15 unidades</p>
                </div>
              </div>
            </div>
            <div class="bg-amber-50 border-l-3 border-amber-400 p-3 rounded-lg">
              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 bg-amber-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-amber-600 text-xs">!</span>
                </div>
                <div>
                  <p class="font-medium text-amber-900 text-sm">Atención</p>
                  <p class="text-xs text-amber-700 mt-0.5">Helado de chocolate: revisar nivel en freezer</p>
                </div>
              </div>
            </div>
            <div class="bg-green-50 border-l-3 border-green-400 p-3 rounded-lg">
              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p class="font-medium text-green-900 text-sm">Sistema OK</p>
                  <p class="text-xs text-green-700 mt-0.5">Punto de venta funcionando correctamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Últimas ventas -->
        <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div class="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <span class="text-sm">🕒</span>
            </div>
            Actividad Reciente
          </h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            @if (recentSales().length === 0) {
              <div class="text-center py-10">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span class="text-3xl">🛒</span>
                </div>
                <p class="text-gray-500 text-sm">No hay ventas registradas</p>
                <p class="text-gray-400 text-xs mt-1">Las transacciones aparecerán aquí</p>
              </div>
            } @else {
              @for (sale of recentSales(); track sale.id) {
                <div class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-100">
                  <div class="bg-blue-100 w-11 h-11 rounded-lg flex items-center justify-center text-blue-700 font-semibold text-xs">
                    #{{ sale.saleNumber }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-800 text-sm truncate">{{ sale.items.length }} producto(s)</p>
                    <p class="text-xs text-gray-500">{{ sale.date | date:'HH:mm:ss' }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900 text-sm">S/ {{ sale.total.toFixed(2) }}</p>
                    <p class="text-xs text-gray-500 capitalize">{{ getPaymentMethodName(sale.paymentMethod) }}</p>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class PosDashboardComponent implements OnInit {
  allSales = signal<any[]>([]);
  currentDateTime = '';
  yesterdayRevenue = 892; // Simulado
  peakHour = '15:00 - 16:00';
  peakHourSales = 12;

  recentSales = computed(() => {
    const sales = this.allSales();
    return sales.slice(0, 6);
  });

  todaySalesCount = computed(() => {
    return this.posService.todaySales().length;
  });

  todayRevenue = computed(() => {
    return this.posService.todaySales().reduce((sum, sale) => sum + sale.total, 0);
  });

  averageTicket = computed(() => {
    const sales = this.posService.todaySales();
    if (sales.length === 0) return 0;
    return this.todayRevenue() / sales.length;
  });

  totalItemsSold = computed(() => {
    return this.posService.todaySales().reduce((sum, sale) => {
      return sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
  });

  itemsPerSale = computed(() => {
    const count = this.todaySalesCount();
    if (count === 0) return 0;
    return this.totalItemsSold() / count;
  });

  goalProgress = computed(() => {
    const goal = 1500;
    return (this.todayRevenue() / goal) * 100;
  });

  constructor(
    private posService: PosService
  ) {}

  ngOnInit(): void {
    this.allSales.set(this.posService.getSales());
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.currentDateTime = now.toLocaleDateString('es-ES', options);
  }

  getPaymentMethodName(method: string): string {
    const methods: { [key: string]: string } = {
      efectivo: 'Efectivo',
      tarjeta: 'Tarjeta',
      yape: 'Yape',
      plin: 'Plin'
    };
    return methods[method] || method;
  }
}
