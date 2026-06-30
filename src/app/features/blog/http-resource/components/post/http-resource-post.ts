import { Component, inject, input } from '@angular/core';
import { HttpResource } from '@/features/blog/http-resource/services/http-resource';

@Component({
  selector: 'app-http-resource-post',
  templateUrl: './http-resource-post.html',
  styleUrl: './http-resource-post.css',
})
export class HttpResourcePost {
  private postService = inject(HttpResource);
  postId = input.required<number>();

  readonly post = this.postService.getPostById(this.postId);
}
