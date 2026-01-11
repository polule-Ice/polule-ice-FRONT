import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/landing/landing.routes').then(m => m.landingRoutes)
	},
	{
		path: 'shop',
		loadChildren: () => import('./features/shop/shop.routes').then(m => m.shopRoutes)
	},
	{
		path: 'menu',
		loadChildren: () => import('./features/menu/menu.routes').then(m => m.MENU_ROUTES)
	},
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
	},
	{
		path: 'pos',
		loadChildren: () => import('./features/pos/pos.routes').then(m => m.POS_ROUTES)
	}
];
