import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { PostList } from './components/ui/post/post-list/post-list';
import { CounterDisplayComponent } from './components/counter-display.component';
import { CounterService } from './services/counter.service';
import { ZardAccordionComponent, ZardAccordionItemComponent } from '@/shared/components/accordion';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardToastComponent } from '@/shared/components/toast';
import { HttpResourcePost } from '@/components/ui/http-resource-post/http-resource-post';
import { LayoutSlot } from '@/components/layout/layout-slot/layout-slot';

@Component({
  selector: 'app-root',
  imports: [
    LayoutSlot,
    PostList,
    CounterDisplayComponent,
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    ZardButtonComponent,
    ZardToastComponent,
    HttpResourcePost,
    LayoutSlot,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('concept');
  counterService = inject(CounterService);
  postID = 1
}
