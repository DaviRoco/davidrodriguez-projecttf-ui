import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../dto/UserDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: boolean = false;
  lastActivityTime: number;
  sessionExpirationTime: number = 30 * 60 * 1000;
  apiUrlUser = `${environment.rootUrl}/user/login`;
  constructor(private router: Router, private http: HttpClient) {
    this.lastActivityTime = Date.now();
    this.initSessionExpirationTimer();
  }

  login(email: string, password: string): Observable<any> {
    let user = new UserDto("0", "", "", email, "", password, 0,"");
    this.isAuthenticated = true;
    this.lastActivityTime = Date.now();
    return this.http.post<any>(this.apiUrlUser, user);
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
