import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const POS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/pos-layout.component').then(m => m.PosLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/pos-dashboard/pos-dashboard.component').then(m => m.PosDashboardComponent)
      },
      {
        path: 'terminal',
        loadComponent: () => import('./components/pos-terminal/pos-terminal.component').then(m => m.PosTerminalComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./pages/pos-inventory/pos-inventory.component').then(m => m.PosInventoryComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/pos-reports/pos-reports-page.component').then(m => m.PosReportsPageComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/pos-settings/pos-settings.component').then(m => m.PosSettingsComponent)
      }
    ]
  }
];
