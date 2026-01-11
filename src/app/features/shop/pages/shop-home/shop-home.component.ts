import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PosNavbarComponent } from '../../../pos/components/pos-navbar/pos-navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/shop.models';

@Component({
  selector: 'app-shop-home',
  standalone: true,
  imports: [
    FormsModule,
    PosNavbarComponent,
    FooterComponent,
    ProductCardComponent
  ],
  templateUrl: './shop-home.component.html'
})
export class ShopHomeComponent {
  protected searchQuery = '';
  protected readonly selectedCategory = signal<Product['category'] | null>(null);

  protected readonly filteredProducts = computed(() => {
    const products = this.productService.products();
    let filtered = [...products];

    // Filtrar por categoría
    if (this.selectedCategory()) {
      filtered = filtered.filter(product => product.category === this.selectedCategory());
    }

    // Filtrar por búsqueda
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  constructor(
    protected productService: ProductService,
    protected cartService: CartService,
    private router: Router
  ) {}

  filterByCategory(category: Product['category'] | null): void {
    this.selectedCategory.set(category);
  }

  onSearch(): void {
    // La búsqueda se actualiza automáticamente por el computed
  }

  handleAddToCart(event: { product: Product; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
    // Opcional: mostrar una notificación de éxito
  }

  viewProductDetails(product: Product): void {
    this.router.navigate(['/shop/product', product.id]);
  }

  goToCart(): void {
    this.router.navigate(['/shop/cart']);
  }
}
