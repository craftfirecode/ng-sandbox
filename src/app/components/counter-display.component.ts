import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-display',
  template: `
    <div class="display">
      <h2>Counter Anzeige</h2>
      <p>
        Aktueller Wert: <strong>{{ counterService.count() }}</strong>
      </p>
      <p>Verdoppelt: {{ counterService.doubled() }}</p>
      <p>Ist gerade: {{ counterService.isEven() ? 'Ja' : 'Nein' }}</p>
    </div>
  `,
  styles: [
    `
      .display {
        padding: 20px;
        border: 2px solid #3f51b5;
        border-radius: 4px;
        margin: 10px 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterDisplayComponent {
  counterService = inject(CounterService);
}
