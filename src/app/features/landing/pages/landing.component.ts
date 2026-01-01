import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LandingHeroComponent } from '../components/landing-hero/landing-hero.component';
import { UbicacionHorarios } from '../components/ubicacion-horarios/ubicacion-horarios';
import { SobreNosotros } from '../components/sobre-nosotros/sobre-nosotros';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    LandingHeroComponent,
    UbicacionHorarios,
    SobreNosotros,
    FooterComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
