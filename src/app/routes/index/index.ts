import { Component, inject } from '@angular/core';
import { CounterDisplayComponent } from '@/features/counter/components/counter-display.component';
import { FormContact } from '@/features/forms/form-contact/form-contact';
import { HttpResourcePost } from '@/features/blog/http-resource/components/post/http-resource-post';
import { LayoutSlot } from '@/shared/layout/layout-slot/layout-slot';
import { PostList } from '@/features/blog/toSignal/components/post-list/post-list';
import { ZardAccordionComponent, ZardAccordionItemComponent } from '@/shared/components/accordion';
import { ZardButtonComponent } from '@/shared/components/button';
import { CounterService } from '@/features/counter/services/counter.service';

@Component({
  selector: 'app-index',
  imports: [
    CounterDisplayComponent,
    FormContact,
    HttpResourcePost,
    LayoutSlot,
    PostList,
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    ZardButtonComponent,
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  counterService = inject(CounterService);
  postID = 1;
}
