import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LandingHeroComponent } from '../components/landing-hero/landing-hero.component';
import { UbicacionHorarios } from '../components/ubicacion-horarios/ubicacion-horarios';
import { SobreNosotros } from '../components/sobre-nosotros/sobre-nosotros';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { PromoLaunch } from '../components/promo-launch/promo-launch';
import { SaboresDestacados } from '../components/sabores-destacados/sabores-destacados';
import { CartaCatalogo } from '../components/carta-catalogo/carta-catalogo';
import { ComoComprar } from '../components/como-comprar/como-comprar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    LandingHeroComponent,
    PromoLaunch,
    SaboresDestacados,
    ComoComprar,
    SobreNosotros,
    UbicacionHorarios,
    FooterComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
