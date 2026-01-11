export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'helados' | 'paletas' | 'sundaes' | 'bebidas' | 'toppings';
  flavors?: string[];
  sizes?: ProductSize[];
  isPopular?: boolean;
  isNew?: boolean;
  inStock: boolean;
  rating?: number;
  ingredients?: string[];
}

export interface ProductSize {
  name: string;
  price: number;
  volume: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: ProductSize;
  selectedFlavor?: string;
  totalPrice: number;
  id: string; // unique cart item id
}

export interface CartSummary {
  subtotal: number;
  delivery: number;
  total: number;
  itemCount: number;
}
