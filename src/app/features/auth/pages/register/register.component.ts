import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string>('');
  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);

  protected formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (this.loading() || !this.canSubmit()) return;

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      const result = await this.authService.register(
        this.formData.email,
        this.formData.password,
        this.formData.name
      );

      if (result.success) {
        // Redirigir al usuario a la página principal
        this.router.navigate(['/']);
      } else {
        this.errorMessage.set(result.error || 'Error al crear la cuenta');
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  passwordsMatch(): boolean {
    return this.formData.password === this.formData.confirmPassword;
  }

  canSubmit(): boolean {
    return (
      this.formData.name.length >= 2 &&
      this.formData.email.includes('@') &&
      this.formData.password.length >= 6 &&
      this.passwordsMatch() &&
      this.formData.acceptTerms
    );
  }
}
