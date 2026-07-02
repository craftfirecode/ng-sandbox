import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  // Zustandsspeicherung mittels Angular Signals
  readonly currentUser = signal<User | null>(null);

  constructor() {
    console.log('[AuthService] Service initialisiert.');
    const storedUser = this.getStoredUser();

    if (storedUser) {
      console.log(
        `[AuthService] Gefundener Cache im LocalStorage für Benutzer: ${storedUser.username}`,
      );
      this.currentUser.set(storedUser);
    } else {
      console.log('[AuthService] Kein Cache im LocalStorage gefunden.');
    }
  }

  /**
   * Prüft asynchron beim Server, ob das gespeicherte Token noch gültig ist.
   */
  async checkAuthStatus(): Promise<boolean> {
    const user = this.currentUser();

    if (!user || !user.accessToken) {
      console.warn('[AuthService] Kein Benutzer oder Token im Zustand vorhanden.');
      this.logout();
      return false;
    }

    console.log('[AuthService] Sende Validierungs-Anfrage an den Server (/auth/me)...');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.accessToken}`,
    });

    try {
      // API-Anfrage zur Token-Verifizierung (DummyJSON /auth/me verlangt Bearer Token)
      const response = await firstValueFrom(
        this.http.get<User>('https://dummyjson.com/auth/me', { headers }),
      );

      if (response) {
        console.log(`[AuthService] Server-Bestätigung erfolgreich! Benutzer: ${response.username}`);

        // Aktualisiere das Signal und behalte das Token im Speicher
        const updatedUser: User = {
          ...response,
          accessToken: user.accessToken,
        };
        this.currentUser.set(updatedUser);
        localStorage.setItem('test_user', JSON.stringify(updatedUser));
        return true;
      }

      console.warn('[AuthService] Server-Antwort war leer.');
      this.logout();
      return false;
    } catch (error) {
      console.error(
        '[AuthService] Token-Validierung fehlgeschlagen (HTTP Error / Timeout):',
        error,
      );
      this.logout();
      return false;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    console.log(`[AuthService] Login-Versuch gestartet für: ${username}`);
    try {
      const response = await firstValueFrom(
        this.http.post<User>('https://dummyjson.com/auth/login', {
          username,
          password,
        }),
      );

      if (response && response.accessToken) {
        console.log(
          `[AuthService] Login erfolgreich. Token generiert: ${response.accessToken.substring(0, 15)}...`,
        );
        this.currentUser.set(response);
        localStorage.setItem('test_user', JSON.stringify(response));
        return true;
      }
      return false;
    } catch (error) {
      console.error('[AuthService] Login-Fehler:', error);
      return false;
    }
  }

  logout(): void {
    console.log('[AuthService] Logge aus. Zustand und LocalStorage werden bereinigt.');
    this.currentUser.set(null);
    localStorage.removeItem('test_user');
  }

  private getStoredUser(): User | null {
    const stored = localStorage.getItem('test_user');
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      console.error('[AuthService] Fehler beim Parsen des LocalStorage-Benutzers.');
      return null;
    }
  }
}
