import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '@/features/blog/toSignal/services/post.service';
import { CounterService } from '@/features/counter/services/counter.service';
import { toSignal } from '@angular/core/rxjs-interop';
import IPost from '@/types/IPost';

@Component({
  selector: 'app-post-list',
  imports: [ReactiveFormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostList {
  private readonly postService = inject(PostService);
  counterService = inject(CounterService);

  readonly posts = toSignal(this.postService.getPosts(), {
    initialValue: [] as IPost[],
  });

  readonly limitControl = new FormControl(5, { nonNullable: true });

  readonly limit = toSignal(this.limitControl.valueChanges, {
    initialValue: this.limitControl.value,
  });
}
