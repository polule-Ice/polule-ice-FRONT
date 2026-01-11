import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem, CartSummary, ProductSize } from '../models/shop.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _deliveryFee = signal<number>(5.00);

  readonly cartItems = this._cartItems.asReadonly();
  readonly deliveryFee = this._deliveryFee.asReadonly();

  readonly cartSummary = computed<CartSummary>(() => {
    const items = this._cartItems();
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const delivery = itemCount > 0 ? this._deliveryFee() : 0;

    return {
      subtotal,
      delivery,
      total: subtotal + delivery,
      itemCount
    };
  });

  readonly isEmpty = computed(() => this._cartItems().length === 0);

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1, selectedSize?: ProductSize, selectedFlavor?: string): void {
    const currentItems = this._cartItems();

    // Buscar si ya existe este producto con las mismas especificaciones
    const existingItemIndex = currentItems.findIndex(item =>
      item.product.id === product.id &&
      item.selectedSize?.name === selectedSize?.name &&
      item.selectedFlavor === selectedFlavor
    );

    if (existingItemIndex >= 0) {
      // Actualizar cantidad del item existente
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
        totalPrice: this.calculateItemPrice(product, updatedItems[existingItemIndex].quantity + quantity, selectedSize)
      };
      this._cartItems.set(updatedItems);
    } else {
      // Agregar nuevo item
      const newItem: CartItem = {
        id: this.generateCartItemId(),
        product,
        quantity,
        selectedSize,
        selectedFlavor,
        totalPrice: this.calculateItemPrice(product, quantity, selectedSize)
      };
      this._cartItems.set([...currentItems, newItem]);
    }

    this.saveCartToStorage();
  }

  updateQuantity(cartItemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }

    const currentItems = this._cartItems();
    const updatedItems = currentItems.map(item =>
      item.id === cartItemId
        ? {
            ...item,
            quantity,
            totalPrice: this.calculateItemPrice(item.product, quantity, item.selectedSize)
          }
        : item
    );

    this._cartItems.set(updatedItems);
    this.saveCartToStorage();
  }

  removeFromCart(cartItemId: string): void {
    const currentItems = this._cartItems();
    const updatedItems = currentItems.filter(item => item.id !== cartItemId);
    this._cartItems.set(updatedItems);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this._cartItems.set([]);
    this.saveCartToStorage();
  }

  private calculateItemPrice(product: Product, quantity: number, selectedSize?: ProductSize): number {
    const basePrice = selectedSize?.price || product.price;
    return basePrice * quantity;
  }

  private generateCartItemId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private saveCartToStorage(): void {
    localStorage.setItem('polule_cart', JSON.stringify(this._cartItems()));
  }

  private loadCartFromStorage(): void {
    try {
      const stored = localStorage.getItem('polule_cart');
      if (stored) {
        const cartItems = JSON.parse(stored) as CartItem[];
        this._cartItems.set(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this._cartItems.set([]);
    }
  }
}
