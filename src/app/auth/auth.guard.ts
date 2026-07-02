import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const targetUrl = state.url;

  console.group(`[Guard] Navigation zu: ${targetUrl}`);
  console.log('[Guard] Starte Prüfung der Authentifizierung...');

  const isTokenValid = await authService.checkAuthStatus();

  if (isTokenValid) {
    console.log('[Guard] Token ist gültig. Zugriff ERLAUBT.');
    console.groupEnd();
    return true;
  }

  console.warn('[Guard] Token ist UNGÜLTIG oder abgelaufen. Zugriff VERWEIGERT!');
  console.log('[Guard] Leite um zu /login...');
  console.groupEnd();

  return router.createUrlTree(['/login']);
};
