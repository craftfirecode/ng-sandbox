import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { LayoutSlot } from './components/ui/layout/layout-slot/layout-slot';
import { PostList } from './components/ui/post/post-list/post-list';
import { CounterDisplayComponent } from './components/counter-display.component';
import { CounterService } from './services/counter.service';
import { RouterOutlet } from '@angular/router';
import { ZardAccordionComponent, ZardAccordionItemComponent } from '@/shared/components/accordion';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardToastComponent } from '@/shared/components/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LayoutSlot,
    PostList,
    CounterDisplayComponent,
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    ZardButtonComponent,
    ZardToastComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('concept');
  counterService = inject(CounterService);
}
