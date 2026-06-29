import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostService } from '../../../../services/post.service';
import IPost from '../../../../types/IPost';
import { CounterService } from '../../../../services/counter.service';

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
