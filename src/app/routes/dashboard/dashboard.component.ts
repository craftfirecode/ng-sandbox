import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/auth/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h2>Geschütztes Dashboard</h2>
      <p>Erfolgreich eingeloggt!</p>

      @if (authService.currentUser(); as user) {
        <div class="user-info">
          <h3>Profil (ausgelesen aus der API):</h3>
          <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
          <p><strong>E-Mail:</strong> {{ user.email }}</p>
          <p><strong>Rolle/ID:</strong> ID {{ user.id }}</p>
        </div>
        <pre><code>{{ user | json }}</code></pre>
      }

      <button (click)="logout()">Abmelden</button>
    </div>
  `,
  styles: `
    pre {
      background-color: #1e1e1e;
      color: #9cdcfe;
      padding: 1.25rem;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Fira Code', Consolas, Monaco, 'Courier New', monospace;
      font-size: 0.9rem;
      border: 1px solid #2d2d2d;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    code {
      color: greenyellow;
    }
    .dashboard-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-family: sans-serif;
    }
    .user-info {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      border-left: 4px solid #0056b3;
    }
    button {
      padding: 10px 15px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
