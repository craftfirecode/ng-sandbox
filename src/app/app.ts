import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutSlot } from './components/ui/layout/layout-slot/layout-slot';
import { PostList } from './components/ui/post/post-list/post-list';
import { CounterDisplayComponent } from './components/counter-display.component';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutSlot, PostList, CounterDisplayComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('concept');
  counterService = inject(CounterService);
}
