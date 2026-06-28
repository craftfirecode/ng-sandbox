import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutSlot } from './components/ui/layout/layout-slot/layout-slot';
import { PostList } from './components/ui/post/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutSlot, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('concept');
}
