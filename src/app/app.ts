import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ZardToastComponent } from '@/shared/components/toast';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    ZardToastComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('concept');
}
