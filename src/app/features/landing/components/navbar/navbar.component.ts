import { Component, signal, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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
  protected readonly activeSection = signal<string>('');

  constructor(
    private router: Router,
    protected authService: AuthService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isOnLanding()) {
      const sections = ['sobre-nosotros', 'ubicacion'];
      const navbarHeight = 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
            this.activeSection.set(sectionId);
            return;
          }
        }
      }

      // Si no hay ninguna sección activa, limpiar
      if (window.scrollY < 200) {
        this.activeSection.set('');
      }
    }
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  isOnLanding(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  scrollToSection(sectionId: string) {
    this.activeSection.set(sectionId);
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

  // Login related methods
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  logout(): void {
    this.authService.logout();
  }

  getUserName(): string {
    const user = this.authService.currentUser();
    return user ? user.name : '';
  }

  getUserInitials(): string {
    const user = this.authService.currentUser();
    if (user) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.charAt(0).toUpperCase();
    }
    return '';
  }
}
