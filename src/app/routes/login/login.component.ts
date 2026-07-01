import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>API Login Test</h2>
      <p>Verwende diese echten API-Testdaten:</p>
      <ul>
        <li>Username: <code>emilys</code></li>
        <li>Passwort: <code>emilyspass</code></li>
      </ul>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" type="text" formControlName="username" />
        </div>

        <div class="form-group">
          <label for="password">Passwort</label>
          <input id="password" type="password" formControlName="password" />
        </div>

        @if (errorMessage()) {
          <p class="error-msg">{{ errorMessage() }}</p>
        }

        <button type="submit" [disabled]="loginForm.invalid || isLoading()">
          @if (isLoading()) {
            Lade...
          } @else {
            Einloggen
          }
        </button>
      </form>
    </div>
  `,
  styles: `
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-family: sans-serif;
    }
    .form-group {
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      margin-bottom: 5px;
      font-weight: bold;
    }
    .form-group input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .error-msg {
      color: red;
      font-weight: bold;
    }
    button {
      padding: 10px 15px;
      background-color: #0056b3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    code {
      background-color: #eee;
      padding: 2px 4px;
      border-radius: 4px;
    }
  `,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  readonly loginForm = this.fb.nonNullable.group({
    username: ['emilys', [Validators.required]],
    password: ['emilyspass', [Validators.required]],
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { username, password } = this.loginForm.getRawValue();
    const success = await this.authService.login(username, password);

    this.isLoading.set(false);

    if (success) {
      await this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set('Fehler: Ungültiger Username oder Passwort!');
    }
  }
}
