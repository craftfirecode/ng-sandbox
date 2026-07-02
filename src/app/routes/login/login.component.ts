import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '@/auth/auth.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputDirective } from '@/shared/components/input';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormField,
    ZardButtonComponent,
    ZardInputDirective,
  ],
  templateUrl: './login.component.html',
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
    required(schemaPath.username);
    required(schemaPath.password);
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
