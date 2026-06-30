import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from '@/features/counter/services/counter.service';

@Component({
  selector: 'app-counter-display',
  template: `
    <div class="border p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
      <h2>Counter Anzeige</h2>
      <p>
        Aktueller Wert: <strong>{{ counterService.count() }}</strong>
      </p>
      <p>Verdoppelt: {{ counterService.doubled() }}</p>
      <p>Ist gerade: {{ counterService.isEven() ? 'Ja' : 'Nein' }}</p>
    </div>
    @if (counterService.count() === 5) {
      <h6>Die Zahl ist 5</h6>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterDisplayComponent {
  counterService = inject(CounterService);
}
