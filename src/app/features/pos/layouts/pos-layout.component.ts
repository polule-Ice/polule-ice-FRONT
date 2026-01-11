import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-pos-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="h-screen bg-gray-50 flex overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <!-- Logo -->
        <div class="p-5 border-b border-gray-200 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 bg-blue-500 rounded-lg flex items-center justify-center text-2xl shadow-sm">
              🍦
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-800">Polule ICE</h1>
              <p class="text-xs text-gray-500">Sistema POS</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="p-3 space-y-1 flex-1 overflow-y-auto">
          <a
            routerLink="/pos/dashboard"
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200"
            [routerLinkActiveOptions]="{exact: true}"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 border border-transparent"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <span class="text-xl">📊</span>
            </div>
            <span class="font-medium text-sm">Panel de Control</span>
          </a>

          <a
            routerLink="/pos/terminal"
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 border border-transparent"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <span class="text-xl">🛒</span>
            </div>
            <span class="font-medium text-sm">Terminal de Ventas</span>
          </a>

          <a
            routerLink="/pos/inventory"
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 border border-transparent"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <span class="text-xl">📦</span>
            </div>
            <span class="font-medium text-sm">Inventario</span>
          </a>

          <a
            routerLink="/pos/reports"
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 border border-transparent"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <span class="text-xl">📈</span>
            </div>
            <span class="font-medium text-sm">Reportes</span>
          </a>

          <div class="border-t border-gray-200 my-2"></div>

          <a
            routerLink="/pos/settings"
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 border border-transparent"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <span class="text-xl">⚙️</span>
            </div>
            <span class="font-medium text-sm">Configuración</span>
          </a>
        </nav>

        <!-- User Info & Logout -->
        <div class="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div class="flex items-center gap-3 mb-3 px-2">
            <div class="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              👤
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm truncate text-gray-800">{{ currentUser() }}</p>
              <p class="text-xs text-gray-500">Cajero</p>
            </div>
          </div>
          <button
            (click)="logout()"
            class="w-full bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span class="text-base">🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Top Header -->
        <header class="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ getPageTitle() }}</h2>
              <p class="text-xs text-gray-500 mt-0.5">{{ getCurrentDate() }}</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <p class="text-xs text-gray-500 mb-0.5">Turno actual</p>
                <p class="font-semibold text-sm text-gray-800">{{ getCurrentTime() }}</p>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto bg-gray-50">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class PosLayoutComponent {
  currentUser = signal('Admin');
  currentTime = signal('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime.set(now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }));
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getCurrentTime(): string {
    return this.currentTime();
  }

  getPageTitle(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return 'Dashboard';
    if (url.includes('terminal')) return 'Terminal de Ventas';
    if (url.includes('inventory')) return 'Inventario';
    if (url.includes('reports')) return 'Reportes';
    if (url.includes('settings')) return 'Configuración';
    return 'Polule ICE - POS';
  }

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
  }
}
