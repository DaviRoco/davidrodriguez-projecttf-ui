import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoginError = false;
  showLoginSuccess = false;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    const email = document.getElementById('input-email') as HTMLInputElement;
    const password = document.getElementById('input-password') as HTMLInputElement;
    this.authenticationService.login(email.value, password.value).subscribe({
      next: (response) => {
        if (response != null) {
          localStorage.setItem('authToken', 'example_token');
          localStorage.setItem('userEmail', response.email);
          this.authenticationService.allowLogIn();
          this.showLoginSuccess = true;
          setTimeout(() => {
            this.showLoginSuccess = false;
          }, 2000);
          this.router.navigate(['/dashboard']).then();
        } else {
          this.showLoginError = true;
          setTimeout(() => {
            this.showLoginError = false;
          }, 2000);
        }
      }
    });


  }
}
