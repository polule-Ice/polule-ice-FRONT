import { Component, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PosNavbarComponent } from '../../../pos/components/pos-navbar/pos-navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductSize } from '../../models/shop.models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    PosNavbarComponent,
    FooterComponent
  ],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  protected readonly product = signal<Product | null>(null);
  protected readonly selectedSize = signal<ProductSize | null>(null);
  protected readonly quantity = signal<number>(1);

  protected readonly totalPrice = computed(() => {
    const prod = this.product();
    if (!prod) return 0;

    const selectedSize = this.selectedSize();
    const basePrice = selectedSize?.price || prod.price;
    return basePrice * this.quantity();
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const foundProduct = this.productService.getProductById(productId);
      if (foundProduct) {
        this.product.set(foundProduct);
        // Si hay tamaños disponibles, seleccionar el primero por defecto
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          this.selectedSize.set(foundProduct.sizes[0]);
        }
      }
    }
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity >= 1) {
      this.quantity.set(newQuantity);
    }
  }

  addToCart(): void {
    const prod = this.product();
    if (!prod || !prod.inStock) return;

    this.cartService.addToCart(
      prod,
      this.quantity(),
      this.selectedSize() || undefined,
      undefined // selectedFlavor - se puede agregar en el futuro
    );

    // Opcional: mostrar notificación de éxito
    alert('¡Producto agregado al carrito! 🎉');
  }

  getMinPrice(): string {
    const prod = this.product();
    if (!prod) return '0.00';

    if (prod.sizes && prod.sizes.length > 0) {
      const minPrice = Math.min(...prod.sizes.map(size => size.price));
      return minPrice.toFixed(2);
    }
    return prod.price.toFixed(2);
  }

  getTotalPrice(): string {
    return this.totalPrice().toFixed(2);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/placeholder-helado.svg';
  }
}
