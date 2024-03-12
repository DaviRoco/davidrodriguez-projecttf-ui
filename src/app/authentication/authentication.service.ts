import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: boolean = false;
  lastActivityTime: number;
  sessionExpirationTime: number = 30 * 60 * 1000;

  constructor(private router: Router) {
    this.lastActivityTime = Date.now();
    this.initSessionExpirationTimer();
  }

  login(email: string, password: string): void {
    // TODO: LOGIN CON EMAIL Y PASSWORD
    this.isAuthenticated = true;
    this.lastActivityTime = Date.now();
  }

  logout(): void {
    // TODO: LOGOUT CON EMAIL Y PASSWORD
    this.isAuthenticated = false;
    this.router.navigate(['/login']).then(navigated => {
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  initSessionExpirationTimer(): void {
    setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.lastActivityTime;
      if (elapsedTime >= this.sessionExpirationTime) {
        this.logout();
      }
    }, 1000);
  }

  updateLastActivityTime(): void {
    this.lastActivityTime = Date.now();
  }
}
