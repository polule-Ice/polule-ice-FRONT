import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'landing-hero',
  standalone: true,
  templateUrl: './landing-hero.component.html',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(200px)', opacity: 0.3 }),
        animate('{{duration}}ms {{delay}}ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ], { params: { duration: 1000, delay: 0 } })
    ]),
    trigger('slideUpTitle', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('{{delay}}ms ease-out', style({ opacity: 1 }))
      ], { params: { delay: 0 } })
    ])
  ]
})
export class LandingHeroComponent {}
