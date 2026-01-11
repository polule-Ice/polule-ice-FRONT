import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PosNavbarComponent } from '../../../pos/components/pos-navbar/pos-navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
    PosNavbarComponent,
    FooterComponent
  ],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  constructor(
    protected cartService: CartService,
    private router: Router
  ) {}

  updateQuantity(cartItemId: string, newQuantity: number): void {
    this.cartService.updateQuantity(cartItemId, newQuantity);
  }

  removeItem(cartItemId: string): void {
    this.cartService.removeFromCart(cartItemId);
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    // En el futuro, esto podría redirigir a una página de checkout
    alert('¡Función de pago próximamente! 🚀\n\nPor ahora puedes contactarnos por WhatsApp para completar tu pedido.');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/placeholder-helado.svg';
  }
}
