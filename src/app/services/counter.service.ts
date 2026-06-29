// counter.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  count = signal(0);

  doubled = computed(() => {
    return this.count() * 2;
  });

  isEven = computed(() => {
    return this.count() % 2 === 0;
  });

  increment(): void {
    this.count.update((current) => {
      return current + 1;
    });
  }

  decrement(): void {
    this.count.update((current) => {
      return current - 1;
    });
  }

  reset(): void {
    this.count.set(0);
  }
}
