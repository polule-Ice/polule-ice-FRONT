import { Routes } from '@angular/router';

export const MENU_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu-libro/menu-libro.component').then(
        (m) => m.MenuLibroComponent
      ),
  },
];
