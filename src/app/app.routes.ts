import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/landing/landing.routes').then(m => m.landingRoutes)
	},
	{
		path: 'menu',
		loadChildren: () => import('./features/menu/menu.routes').then(m => m.MENU_ROUTES)
	}
];
