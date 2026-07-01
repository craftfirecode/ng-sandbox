import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/auth/auth.service';

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
      }

      <button (click)="logout()">Abmelden</button>
    </div>
  `,
  styles: `
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
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
