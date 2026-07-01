import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals'; // Angular 21 Signal Forms Imports
import { AuthService } from '@/auth/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField], // Keine ReactiveFormsModule nötig! Nur noch FormField importieren.
  template: `
    <div class="login-container">
      <h2>API Login Test (Signal Forms)</h2>
      <p>Verwende diese echten API-Testdaten:</p>
      <ul>
        <li>Username: <code>emilys</code></li>
        <li>Passwort: <code>emilyspass</code></li>
      </ul>

      <!-- Normales HTML-Form-Event verwenden -->
      <form (submit)="onSubmit(); $event.preventDefault()">
        <div class="form-group">
          <label for="username">Username</label>
          <!-- Bindung erfolgt direkt über [formField] an den Pfad im FieldTree -->
          <input id="username" type="text" [formField]="loginForm.username" />

          <!-- Validierungsfehler über Signals auslesen (Feld als Funktion aufrufen!) -->
          @if (loginForm.username().touched() && loginForm.username().invalid()) {
            <span class="error-msg">Username ist erforderlich</span>
          }
        </div>

        <div class="form-group">
          <label for="password">Passwort</label>
          <input id="password" type="password" [formField]="loginForm.password" />

          @if (loginForm.password().touched() && loginForm.password().invalid()) {
            <span class="error-msg">Passwort ist erforderlich</span>
          }
        </div>

        @if (errorMessage()) {
          <p class="error-msg">{{ errorMessage() }}</p>
        }

        <!-- Button wird deaktiviert, wenn das Formular-Signal (Wurzel) invalid ist oder lädt -->
        <button type="submit" [disabled]="loginForm().invalid() || isLoading()">
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
      font-size: 13px;
      margin-top: 4px;
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

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  readonly loginModel = signal({
    username: 'emilys',
    password: 'emilyspass',
  });

  readonly loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username ist erforderlich.' });
    required(schemaPath.password, { message: 'Passwort ist erforderlich.' });
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm().invalid()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { username, password } = this.loginModel();
    const success = await this.authService.login(username, password);

    this.isLoading.set(false);

    if (success) {
      await this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set('Fehler: Ungültiger Username oder Passwort!');
    }
  }
}
