import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Guard que protege rutas que requieren autenticación
 * Redirige a /auth/login si el usuario no está logueado
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirigir al login
  router.navigate(['/auth/login']);
  return false;
};

/**
 * Guard que previene que usuarios autenticados accedan a páginas públicas
 * Redirige al POS si el usuario ya está logueado
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true;
  }

  // Redirigir al POS si ya está logueado
  router.navigate(['/pos']);
  return false;
};
