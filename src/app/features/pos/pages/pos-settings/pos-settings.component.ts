import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pos-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- General Settings -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
            <span class="text-2xl">⚙️</span>
            <span>Configuración General</span>
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-chocolate mb-2">Nombre del Negocio</label>
              <input type="text" value="Polule ICE" class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amarilloMango">
            </div>
            <div>
              <label class="block text-sm font-semibold text-chocolate mb-2">RUC / DNI</label>
              <input type="text" value="20123456789" class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amarilloMango">
            </div>
            <div>
              <label class="block text-sm font-semibold text-chocolate mb-2">Dirección</label>
              <input type="text" value="Av. Principal 123, Lima" class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amarilloMango">
            </div>
            <div>
              <label class="block text-sm font-semibold text-chocolate mb-2">Teléfono</label>
              <input type="text" value="987 654 321" class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amarilloMango">
            </div>
          </div>
        </div>

        <!-- Receipt Settings -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
            <span class="text-2xl">🧾</span>
            <span>Configuración de Tickets</span>
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-chocolate">Imprimir automáticamente</span>
              <label class="relative inline-block w-12 h-6 cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-full h-full bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors"></div>
                <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-chocolate">Mostrar logo en ticket</span>
              <label class="relative inline-block w-12 h-6 cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-full h-full bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors"></div>
                <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-chocolate">Mensaje de pie de página</span>
              <label class="relative inline-block w-12 h-6 cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-full h-full bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors"></div>
                <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- System Settings -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
            <span class="text-2xl">🖥️</span>
            <span>Sistema</span>
          </h3>
          <div class="space-y-3">
            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-left flex items-center justify-between cursor-pointer">
              <span>💾 Respaldar datos</span>
              <span>→</span>
            </button>
            <button class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-left flex items-center justify-between cursor-pointer">
              <span>📥 Restaurar datos</span>
              <span>→</span>
            </button>
            <button class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-left flex items-center justify-between cursor-pointer">
              <span>🗑️ Limpiar datos antiguos</span>
              <span>→</span>
            </button>
          </div>
        </div>

        <!-- About -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
            <span class="text-2xl">ℹ️</span>
            <span>Información del Sistema</span>
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Versión</span>
              <span class="font-semibold text-chocolate">1.0.0</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Última actualización</span>
              <span class="font-semibold text-chocolate">10/01/2026</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Licencia</span>
              <span class="font-semibold text-green-600">✓ Activa</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-6 flex justify-end">
        <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors cursor-pointer flex items-center gap-2">
          <span>💾</span>
          <span>Guardar Cambios</span>
        </button>
      </div>
    </div>
  `
})
export class PosSettingsComponent {}
