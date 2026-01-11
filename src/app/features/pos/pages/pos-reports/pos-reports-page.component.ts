import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosReportsComponent } from '../../components/pos-reports/pos-reports.component';

@Component({
  selector: 'app-pos-reports-page',
  standalone: true,
  imports: [CommonModule, PosReportsComponent],
  templateUrl: './pos-reports-page.component.html'
})
export class PosReportsPageComponent {}
