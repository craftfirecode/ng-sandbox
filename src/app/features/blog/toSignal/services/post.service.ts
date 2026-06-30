import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IPost from '@/types/IPost';


@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/albums';

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
  }

  createFolder(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.apiUrl, post);
  }

  updateFolder(id: number, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.apiUrl}/${id}`, post);
  }
}
