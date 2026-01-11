// Aquí defines las rutas específicas de la feature landing
import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing.component';
import { guestGuard } from '../../core/guards/auth.guard';

export const landingRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [guestGuard] // Solo usuarios no autenticados pueden acceder
  }
];
