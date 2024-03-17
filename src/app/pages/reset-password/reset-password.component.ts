import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";
import {UsersService} from "../users/users.service";
import {ResetPasswordService} from "./reset-password.service";
import {UserDto} from "../../dto/UserDto";

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  showEmailEmptyError: boolean = false;
  showEmailNotFoundError: boolean = false;
  constructor(
    private resetPasswordService: ResetPasswordService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  resetUserPassword() {
    const email = document.getElementById('input-email') as HTMLInputElement;
    let invalid = false;
    if (email.value === "") {
      this.showEmailEmptyError = true;
      setTimeout(() => {
        this.showEmailEmptyError = false;
      }, 2000);
      invalid = true;
    }
    if (invalid) {
      return;
    } else {
      this.resetPasswordService.getUserByEmail(email.value).subscribe({
        next: (response: UserDto) => {
          if (response != null){
            this.sendResetEmail(response);

          } else {
            this.showEmailNotFoundError = true;
            setTimeout(() => {
              this.showEmailNotFoundError = false;
            }, 2000);
          }
        }
      })
    }

  }
  sendResetEmail(user: UserDto) {
    this.resetPasswordService.sendResetEmail(user).subscribe({
      next: () => {
        // this.router.navigate(['/change-password'],{ queryParams: { email: user.email } }).then();
      }
    });
  }
}
