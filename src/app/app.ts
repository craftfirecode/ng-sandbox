import { LayoutSlot } from '@/shared/layout/layout-slot/layout-slot';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PostList } from '@/features/blog/toSignal/components/post-list/post-list';
import { CounterDisplayComponent } from '@/features/counter/components/counter-display.component';
import { ZardAccordionComponent, ZardAccordionItemComponent } from '@/shared/components/accordion';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardToastComponent } from '@/shared/components/toast';
import { CounterService } from '@/features/counter/services/counter.service';
import { HttpResourcePost } from '@/features/blog/http-resource/components/post/http-resource-post';

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
    LayoutSlot,
    HttpResourcePost,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('concept');
  counterService = inject(CounterService);
  postID = 1;
}
