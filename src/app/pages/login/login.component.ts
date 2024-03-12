import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    this.authenticationService.login("email", "password");
    this.router.navigate(['/dashboard']).then(navigated => {
      if (navigated) {
        console.log("Redirected to dashboard");
      } else {
        console.error("Navigation to dashboard failed");
        // Optionally, handle the failure to navigate
      }
    });
  }
}
