import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";
import {UsersService} from "../users/users.service";
import {ChangePasswordService} from "./change-password.service";
import {UserDto} from "../../dto/UserDto";

@Component({
  selector: 'app-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  showPasswordError: boolean = false;
  showConfirmPasswordError: boolean = false;
  showNotMatchingError: boolean = false;
  showNotExistingUser: boolean = false;
  constructor(
    private changePasswordService: ChangePasswordService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  changeUserPassword() {
    const password = document.getElementById('input-password') as HTMLInputElement;
    const confirmPassword = document.getElementById('input-repeat-password') as HTMLInputElement;
    let invalid = false;
    if (password.value === "" || password.value.length < 10) {
      this.showPasswordError = true;
      setTimeout(() => {
        this.showPasswordError = false;
      }, 2000);
      invalid = true;
    }
    if (confirmPassword.value === "") {
      this.showConfirmPasswordError = true;
      setTimeout(() => {
        this.showConfirmPasswordError = false;
      }, 2000);
      invalid = true;
    }
    if (password.value != confirmPassword.value) {
      this.showNotMatchingError = true;
      setTimeout(() => {
        this.showNotMatchingError = false;
      }, 2000);
      invalid = true;
    }
    if (invalid) {
      return;
    } else {
      this.changePasswordService.getUserByEmail(this.getEmailFromUrl(window.location.href)).subscribe({
        next: (response: UserDto) => {
          if (response != null){
            response.password = password.value;
            response.state = "Activo";
            this.updateUser(response);
          } else {
            this.showNotExistingUser = true;
            setTimeout(() => {
              this.showNotExistingUser = false;
            }, 2000);
          }
        }
      })
    }

  }
  updateUser(user: UserDto) {
    this.changePasswordService.updateUser(user).subscribe({
      next: () => {
        this.router.navigate(['/login']).then();
      }
    });

  }

  getEmailFromUrl(url: string): string | null {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    return searchParams.get('email');
  }
}
