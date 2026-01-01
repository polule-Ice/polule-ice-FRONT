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
      title: 'Conos Helado Soft',
      items: [
        { name: 'Cono Vainilla', price: 2.50, description: 'Cono con helado soft cremoso sabor vainilla', image: '/assets/helados.jpg' },
        { name: 'Cono Chocolate', price: 2.50, description: 'Cono con helado soft cremoso sabor chocolate', image: '/assets/helados.jpg' },
        { name: 'Cono Mixto', price: 3.50, description: 'Cono con helado soft cremoso sabor combinado (vainilla y chocolate)', image: '/assets/helados.jpg' },
        { name: 'Super Cono Vainilla', price: 4.00, description: 'Cono grande con helado soft cremoso sabor vainilla', image: '/assets/helados.jpg' },
        { name: 'Super Cono Chocolate', price: 4.00, description: 'Cono grande con helado soft cremoso sabor chocolate', image: '/assets/helados.jpg' },
        { name: 'Super Cono Mixto', price: 5.00, description: 'Cono grande con helado soft cremoso sabor combinado', image: '/assets/helados.jpg' },
      ]
    },
    {
      title: 'Vasitos Sundae',
      items: [
        { name: 'Sundae de Chocolate', price: 6.50, description: 'Vasito con helado soft, crema de chocolate y toppings', image: '/assets/helados.jpg' },
        { name: 'Sundae de Fresa', price: 6.50, description: 'Vasito con helado soft, crema de fresa y toppings', image: '/assets/helados.jpg' },
        { name: 'Sundae de Caramelo', price: 6.50, description: 'Vasito con helado soft, crema de caramelo y toppings', image: '/assets/helados.jpg' },
        { name: 'Sundae Oreo', price: 7.50, description: 'Vasito con helado soft, galletas Oreo trituradas y crema', image: '/assets/helados.jpg' },
      ]
    },
    {
      title: 'Toppings',
      items: [
        { name: 'Oreo', price: 1.00, description: 'Galletas Oreo trituradas', image: '/assets/helados.jpg' },
        { name: 'Malvaviscos', price: 1.00, description: 'Malvaviscos suaves y esponjosos', image: '/assets/helados.jpg' },
        { name: 'Chochos (Chin Chin)', price: 1.00, description: 'Bolitas crujientes de chocolate', image: '/assets/helados.jpg' },
        { name: 'Chips de Chocolate', price: 1.00, description: 'Chips de chocolate premium', image: '/assets/helados.jpg' },
        { name: 'Gomitas', price: 1.00, description: 'Gomitas de colores variadas', image: '/assets/helados.jpg' },
        { name: 'Galleta Triturada', price: 1.00, description: 'Galletas dulces finamente trituradas', image: '/assets/helados.jpg' },
        { name: 'Maní Garrapiñado', price: 1.00, description: 'Maní caramelizado crujiente', image: '/assets/helados.jpg' },
        { name: 'Sprinkles de Colores', price: 1.00, description: 'Grageas de colores brillantes', image: '/assets/helados.jpg' },
      ]
    },
    {
      title: 'Especiales',
      items: [
        { name: 'Milkshake', price: 7.00, description: 'Batido cremoso con helado soft, sabor a elección', image: '/assets/helados.jpg' },
        { name: 'Banana Split', price: 9.00, description: 'Plátano con helado soft, 3 cremas y toppings', image: '/assets/helados.jpg' },
        { name: 'Copa Familiar', price: 15.00, description: 'Para compartir: helado soft abundante con 5 toppings', image: '/assets/helados.jpg' },
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
