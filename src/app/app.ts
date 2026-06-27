import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutSlot } from './layout-slot/layout-slot';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutSlot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('concept');
}
