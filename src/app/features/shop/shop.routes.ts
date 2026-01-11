import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const shopRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/shop-home/shop-home.component').then(m => m.ShopHomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  }
];
