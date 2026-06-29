import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import IPost from '@/types/IPost';

@Injectable({
  providedIn: 'root',
})
export class HttpResource {
  getPostById(id: () => number) {
    return httpResource<IPost>(() => `https://jsonplaceholder.typicode.com/posts/${id()}`);
  }
}
