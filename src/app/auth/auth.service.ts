import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  // Lädt den User beim Start direkt aus dem LocalStorage
  readonly currentUser = signal<User | null>(this.getStoredUser());

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<User>('https://dummyjson.com/auth/login', {
          username,
          password,
        }),
      );

      if (response) {
        this.currentUser.set(response);
        localStorage.setItem('test_user', JSON.stringify(response)); // Im Browser speichern
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('test_user'); // Aus Browser löschen
  }

  private getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      // Verhindert SSR-Fehler
      const stored = localStorage.getItem('test_user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }
}
