import { Component, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [RouterLink, RouterLinkActive],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-40px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerItems', [
      transition(':enter', [
        style({ transform: 'translateY(-25px)', opacity: 0 }),
        animate('{{delay}}ms 100ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ], { params: { delay: 400 } })
    ])
  ]
})
export class NavbarComponent {
  protected readonly menuOpen = signal(false);

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  isOnLanding(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  scrollToSection(sectionId: string) {
    if (!this.isOnLanding()) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollTo(sectionId), 100);
      });
    } else {
      this.scrollTo(sectionId);
    }
    this.menuOpen.set(false);
  }

  private scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // altura aproximada del navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
