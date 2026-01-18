import { Component, ElementRef, OnInit, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-promo-launch',
  standalone: true,
  imports: [],
  templateUrl: './promo-launch.html',
  animations: [
    trigger('fadeInUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('0.6s ease-out')
      ])
    ]),
    trigger('scaleIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class PromoLaunch implements OnInit {
  isVisible = signal(false);

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(this.elementRef.nativeElement);
  }
}
