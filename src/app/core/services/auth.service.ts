import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isLoggedIn = signal<boolean>(false);
  private readonly _currentUser = signal<User | null>(null);

  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();

  constructor() {
    // Verificar si hay una sesión guardada en localStorage
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('polule_user');
    const storedAuth = localStorage.getItem('polule_auth');

    if (storedUser && storedAuth === 'true') {
      try {
        const user = JSON.parse(storedUser);
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
      } catch (error) {
        this.logout(); // Limpiar datos corruptos
      }
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulación de autenticación - en producción esto sería una llamada a tu API
      // Por ahora, cualquier email con password "123456" será válido
      if (password === '123456') {
        const user: User = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0] // Usar la parte del email antes del @
        };

        this._currentUser.set(user);
        this._isLoggedIn.set(true);

        // Guardar en localStorage
        localStorage.setItem('polule_user', JSON.stringify(user));
        localStorage.setItem('polule_auth', 'true');

        return { success: true };
      } else {
        return { success: false, error: 'Credenciales inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }

  logout(): void {
    this._currentUser.set(null);
    this._isLoggedIn.set(false);

    // Limpiar localStorage
    localStorage.removeItem('polule_user');
    localStorage.removeItem('polule_auth');
  }

  // Método para registro (opcional para futuro)
  async register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulación de registro
      const user: User = {
        id: Date.now().toString(),
        email,
        name
      };

      this._currentUser.set(user);
      this._isLoggedIn.set(true);

      localStorage.setItem('polule_user', JSON.stringify(user));
      localStorage.setItem('polule_auth', 'true');

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al registrarse' };
    }
  }
}
