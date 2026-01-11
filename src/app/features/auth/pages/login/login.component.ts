import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string>('');
  protected readonly showPassword = signal(false);

  protected formData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (this.loading()) return;

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      const result = await this.authService.login(this.formData.email, this.formData.password);

      if (result.success) {
        // Redirigir al usuario al sistema POS
        this.router.navigate(['/pos/terminal']);
      } else {
        this.errorMessage.set(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      this.errorMessage.set('Error de conexión. Intenta nuevamente.');
    } finally {
      this.loading.set(false);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
}
