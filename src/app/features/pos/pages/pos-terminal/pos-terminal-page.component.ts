import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosTerminalComponent } from '../../components/pos-terminal/pos-terminal.component';

@Component({
  selector: 'app-pos-terminal-page',
  standalone: true,
  imports: [CommonModule, PosTerminalComponent],
  templateUrl: './pos-terminal-page.component.html'
})
export class PosTerminalPageComponent {}
