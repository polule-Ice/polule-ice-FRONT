import { Injectable, signal } from '@angular/core';
import { Product } from '../models/shop.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this._loading.set(true);

    // Productos reales de Polule ICE
    const mockProducts: Product[] = [
      // HELADOS DE CONO
      {
        id: '1',
        name: 'Cono de Vainilla',
        description: 'Helado cremoso de vainilla en cono',
        price: 5.00,
        image: '/assets/helados.jpg',
        category: 'helados',
        isPopular: true,
        inStock: true,
        rating: 4.8,
        ingredients: ['Leche', 'Crema', 'Azúcar', 'Vainilla']
      },
      {
        id: '2',
        name: 'Cono de Chocolate',
        description: 'Helado de chocolate en cono',
        price: 5.00,
        image: '/assets/helados.jpg',
        category: 'helados',
        isPopular: true,
        inStock: true,
        rating: 4.9,
        ingredients: ['Leche', 'Crema', 'Azúcar', 'Chocolate']
      },
      {
        id: '3',
        name: 'Cono Combinado',
        description: 'Helado de vainilla y chocolate en cono',
        price: 5.00,
        image: '/assets/helados.jpg',
        category: 'helados',
        isPopular: true,
        inStock: true,
        rating: 4.8,
        ingredients: ['Leche', 'Crema', 'Azúcar', 'Vainilla', 'Chocolate']
      },

      // SUNDAES
      {
        id: '4',
        name: 'Sundae de Fresa',
        description: 'Helado con salsa de fresa, crema y topping',
        price: 12.00,
        image: '/assets/helados.jpg',
        category: 'sundaes',
        isPopular: true,
        inStock: true,
        rating: 4.7,
        ingredients: ['Helado', 'Salsa de fresa', 'Crema', 'Cereza']
      },
      {
        id: '5',
        name: 'Sundae de Chocolate',
        description: 'Helado con salsa de chocolate, crema y topping',
        price: 12.00,
        image: '/assets/helados.jpg',
        category: 'sundaes',
        isPopular: true,
        inStock: true,
        rating: 4.8,
        ingredients: ['Helado', 'Salsa de chocolate', 'Crema', 'Cereza']
      },
      {
        id: '6',
        name: 'Sundae de Maracuyá',
        description: 'Helado con salsa de maracuyá, crema y topping',
        price: 12.00,
        image: '/assets/helados.jpg',
        category: 'sundaes',
        inStock: true,
        rating: 4.6,
        ingredients: ['Helado', 'Salsa de maracuyá', 'Crema', 'Cereza']
      },
      {
        id: '7',
        name: 'Sundae de Lúcuma',
        description: 'Helado con salsa de lúcuma, crema y topping',
        price: 12.00,
        image: '/assets/helados.jpg',
        category: 'sundaes',
        inStock: true,
        rating: 4.7,
        ingredients: ['Helado', 'Salsa de lúcuma', 'Crema', 'Cereza']
      },

      // TOPPINGS
      {
        id: '8',
        name: 'Topping Trululu',
        description: 'Topping de gomitas Trululu',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        inStock: true,
        rating: 4.5,
        ingredients: ['Gomitas Trululu']
      },
      {
        id: '9',
        name: 'Topping Gomitas de Ositos',
        description: 'Topping de gomitas en forma de ositos',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        inStock: true,
        rating: 4.4,
        ingredients: ['Gomitas de ositos']
      },
      {
        id: '10',
        name: 'Topping Maní',
        description: 'Topping de maní tostado',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        inStock: true,
        rating: 4.3,
        ingredients: ['Maní tostado']
      },
      {
        id: '11',
        name: 'Topping Oreo',
        description: 'Topping de galletas Oreo trituradas',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        isPopular: true,
        inStock: true,
        rating: 4.8,
        ingredients: ['Galletas Oreo']
      },
      {
        id: '12',
        name: 'Topping Chispitas de Chocolate',
        description: 'Topping de chispitas de chocolate',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        inStock: true,
        rating: 4.6,
        ingredients: ['Chispitas de chocolate']
      },
      {
        id: '13',
        name: 'Topping Grajeas de Chocolate',
        description: 'Topping de grajeas de chocolate de colores',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        inStock: true,
        rating: 4.5,
        ingredients: ['Grajeas de chocolate']
      },
      {
        id: '14',
        name: 'Topping Barquillo',
        description: 'Barquillo crujiente',
        price: 1.00,
        image: '/assets/helados.jpg',
        category: 'toppings',
        inStock: true,
        rating: 4.4,
        ingredients: ['Barquillo']
      }
    ];

    // Cargar productos inmediatamente
    this._products.set(mockProducts);
    this._loading.set(false);
  }

  getProductById(id: string): Product | undefined {
    return this._products().find(product => product.id === id);
  }

  getProductsByCategory(category: Product['category']): Product[] {
    return this._products().filter(product => product.category === category);
  }

  getPopularProducts(): Product[] {
    return this._products().filter(product => product.isPopular && product.inStock);
  }

  getNewProducts(): Product[] {
    return this._products().filter(product => product.isNew && product.inStock);
  }

  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this._products().filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
}
