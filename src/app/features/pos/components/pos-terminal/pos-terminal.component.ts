import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../services/pos.service';
import { ProductService } from '../../../shop/services/product.service';
import { Product } from '../../../shop/models/shop.models';
import { SaleItem } from '../../models/sale.interface';
import { ProductSelectorComponent } from '../product-selector/product-selector.component';
import { CurrentSaleComponent } from '../current-sale/current-sale.component';

@Component({
  selector: 'app-pos-terminal',
  standalone: true,
  imports: [CommonModule, ProductSelectorComponent, CurrentSaleComponent],
  templateUrl: './pos-terminal.component.html'
})
export class PosTerminalComponent implements OnInit {
  products = signal<Product[]>([]);

  constructor(
    public posService: PosService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Los productos ahora se cargan inmediatamente
    this.products.set(this.productService.products());

    // En caso de que los productos no estén listos, suscribirnos a cambios
    if (this.productService.products().length === 0) {
      const checkProducts = () => {
        const currentProducts = this.productService.products();
        if (currentProducts.length > 0) {
          this.products.set(currentProducts);
        } else {
          // Verificar nuevamente en 100ms
          setTimeout(checkProducts, 100);
        }
      };
      checkProducts();
    }
  }

  onProductAdded(event: SaleItem): void {
    this.posService.addToCurrentSale(event);
  }

  removeFromSale(itemId: string): void {
    this.posService.removeFromCurrentSale(itemId);
  }

  updateQuantity(data: { id: string; quantity: number }): void {
    this.posService.updateCurrentSaleItemQuantity(data.id, data.quantity);
  }

  openPaymentModal(): void {
    // Payment modal is handled by the CurrentSaleComponent
  }

  cancelSale(): void {
    this.posService.clearCurrentSale();
  }

  getTotal(): number {
    return this.posService.currentSaleTotal();
  }
}
