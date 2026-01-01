import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../landing/components/navbar/navbar.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-menu-libro',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './menu-libro.component.html',
  styleUrls: ['./menu-libro.component.css'],
  animations: [
    trigger('fallIn', [
      transition('* => *', [
        query(':enter', [
          style({
            transform: 'translateY(-100px) rotate(-15deg)',
            opacity: 0
          }),
          stagger('150ms', [
            animate('800ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              style({
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
              })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MenuLibroComponent {
  selectedItem: any = null;

  categories = [
    {
      title: 'Conos Polule',
      items: [
        { name: 'Polulito', price: 2.50, description: 'Cono pequeño con helado soft cremoso y 1 topping', image: '/assets/helados.jpg' },
        { name: 'Polule Clásico', price: 3.50, description: 'Cono mediano con helado soft en espiral y 2 toppings', image: '/assets/helados.jpg' },
        { name: 'Mega Polule', price: 5.00, description: 'Cono grande con helado soft extra y 3 toppings premium', image: '/assets/helados.jpg' },
      ]
    },
    {
      title: 'Copas y Sundaes',
      items: [
        { name: 'Copa Polule', price: 4.00, description: 'Helado soft cremoso en copa con 2 toppings y salsa', image: '/assets/helados.jpg' },
        { name: 'Sundae Polule Deluxe', price: 6.50, description: 'Copa grande con helado soft, 3 toppings, salsa y crema batida', image: '/assets/helados.jpg' },
        { name: 'Brownie Polule', price: 7.50, description: 'Brownie caliente con helado soft, salsa de chocolate y nueces', image: '/assets/helados.jpg' },
      ]
    },
    {
      title: 'Especiales Polule',
      items: [
        { name: 'Milkshake Polule', price: 5.50, description: 'Batido cremoso con helado soft, sabor a elección y crema', image: '/assets/helados.jpg' },
        { name: 'Banana Split Polule', price: 8.00, description: 'Plátano con helado soft, 3 salsas, toppings y cereza', image: '/assets/helados.jpg' },
        { name: 'Copa Familiar Polule', price: 12.00, description: 'Para compartir: helado soft abundante con 5 toppings variados', image: '/assets/helados.jpg' },
      ]
    },
    {
      title: 'Toppings & Extras',
      items: [
        { name: 'Chips de Chocolate', price: 0.50, description: 'Crujientes chips de chocolate premium', image: '/assets/helados.jpg' },
        { name: 'Gomitas Polule', price: 0.50, description: 'Gomitas de colores suaves y dulces', image: '/assets/helados.jpg' },
        { name: 'Oreo Crush', price: 0.80, description: 'Galletas Oreo finamente trituradas', image: '/assets/helados.jpg' },
        { name: 'Salsa Premium', price: 0.80, description: 'Chocolate, caramelo, fresa o mora - a elección', image: '/assets/helados.jpg' },
        { name: 'Maní Garrapiñado', price: 1.00, description: 'Maní caramelizado crujiente artesanal', image: '/assets/helados.jpg' },
        { name: 'Crema Batida', price: 0.80, description: 'Crema batida suave con vainilla', image: '/assets/helados.jpg' },
      ]
    }
  ];

  openItemDetail(item: any) {
    this.selectedItem = item;
  }

  closeItemDetail() {
    this.selectedItem = null;
  }
}
