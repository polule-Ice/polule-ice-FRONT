import { Component, input, output } from '@angular/core';
import { Product } from '../../models/shop.models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  product = input.required<Product>();

  addToCart = output<{ product: Product; quantity: number }>();
  viewDetails = output<Product>();

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/placeholder-helado.svg';
  }

  getCategoryName(category: string): string {
    const categoryNames = {
      'helados': '🍨 Helados',
      'paletas': '🍭 Paletas',
      'sundaes': '🍧 Sundaes',
      'bebidas': '🥤 Bebidas'
    };
    return categoryNames[category as keyof typeof categoryNames] || category;
  }

  getMinPrice(): string {
    const product = this.product();
    if (product.sizes && product.sizes.length > 0) {
      const minPrice = Math.min(...product.sizes.map(size => size.price));
      return minPrice.toFixed(2);
    }
    return product.price.toFixed(2);
  }

  quickAddToCart(): void {
    const product = this.product();
    if (product.inStock) {
      this.addToCart.emit({ product, quantity: 1 });
    }
  }

  onAddToCart(): void {
    this.quickAddToCart();
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product());
  }
}
