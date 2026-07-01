import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ZardToastComponent } from '@/shared/components/toast';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ZardDemoMenuDefaultComponent } from '@/features/menu/menu';

@Component({
  selector: 'app-root',
  imports: [ZardToastComponent, RouterLink, RouterOutlet, ZardDemoMenuDefaultComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('concept');
}
