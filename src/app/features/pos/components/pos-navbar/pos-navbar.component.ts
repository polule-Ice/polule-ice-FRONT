import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PosService } from '../../services/pos.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-pos-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pos-navbar.component.html',
})
export class PosNavbarComponent {
  // Usar inject pattern para evitar problemas de dependency injection
  private authService = inject(AuthService);

  constructor(public router: Router, public posService: PosService) {}

  goToTerminal(): void {
    this.router.navigate(['/pos/terminal']);
  }

  goToReports(): void {
    this.router.navigate(['/pos/reports']);
  }

  logout(): void {
    // Limpiar venta actual antes de cerrar sesión
    this.posService.clearCurrentSale();

    // Cerrar sesión
    this.authService.logout();

    // Redirigir al landing
    this.router.navigate(['/']);
  }

  newSale(): void {}
  goToShop(): void {}

  
}
