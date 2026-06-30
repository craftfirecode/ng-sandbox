import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

interface ProfileData {
  username: string;
  email: string;
}

@Component({
  selector: 'app-form-contact',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush wie gefordert
  templateUrl: './form-contact.html',
  styleUrl: './form-contact.css',
})
export class FormContact {
  // Writable Signal als "Source of Truth"
  protected readonly profileModel = signal<ProfileData>({
    username: '',
    email: '',
  });

  // Definition des Signal Forms mit expliziten Error-Messages
  protected readonly profileForm = form(this.profileModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Benutzername ist erforderlich.' });
    minLength(schemaPath.username, 3, { message: 'Mindestens 3 Zeichen benötigt.' });

    required(schemaPath.email, { message: 'E-Mail ist erforderlich.' });
    email(schemaPath.email, { message: 'Bitte eine gültige E-Mail-Adresse eingeben.' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();

    // Richtig: profileForm() aufrufen, um das FieldState-Objekt zu erhalten
    if (this.profileForm().valid()) {
      console.log('Formular erfolgreich abgesendet!', this.profileModel());
    }
  }
}
