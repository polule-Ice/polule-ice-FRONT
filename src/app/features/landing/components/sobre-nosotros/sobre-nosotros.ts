import { Component, ElementRef, OnInit, signal } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  templateUrl: './sobre-nosotros.html',
  animations: [
    trigger('slideFromLeft', [
      state('hidden', style({ transform: 'translateX(-50px)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('0.7s ease-out'))
    ]),
    trigger('slideFromRight', [
      state('hidden', style({ transform: 'translateX(50px)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('0.7s ease-out'))
    ])
  ]
})
export class SobreNosotros implements OnInit {
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
