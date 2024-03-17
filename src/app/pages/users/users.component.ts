import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserDto} from "../../dto/UserDto";
import {UsersService} from "./users.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tables',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: UserDto[] = [];
  usersSubscription: Subscription;
  stateChangeUserId: string;
  userState: string;
  showChangeStateUserModal: boolean = false;
  changeStateUserError: boolean;
  changeUserSuccess: boolean = false;
  showCreateUserModal: boolean = false;
  showFirstNameError: boolean = false;
  showLastNameError: boolean = false;
  showAgeError: boolean = false;
  showPhoneError: boolean = false;
  showEmailError: boolean = false;
  createUserError: boolean = false;
  genderType: string;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.usersSubscription = this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    })
  }

  openUserDisableModal(user: UserDto) {
    this.stateChangeUserId = user.id;
    this.userState = user.state;
    this.showChangeStateUserModal = true;
  }
  closeItemChangeStateModal() {
    const confirmDelete = document.getElementById('input-confirm-delete') as HTMLInputElement;
    if (confirmDelete.value != "") {
      confirmDelete.value = "";
    }
    this.showChangeStateUserModal = false;
  }
  changeUserState() {
    const confirmDelete = document.getElementById('input-confirm-delete') as HTMLInputElement;
    if (confirmDelete.value === "confirmar") {
      const userDto = new UserDto(this.stateChangeUserId, "", "", "", "", "", 0, "", "");
      this.changeUserSuccess = true;
      setTimeout(() => {
        this.changeUserSuccess = false;
      }, 2000);
      this.usersService.changeUserState(userDto).subscribe(() => {
        this.getUsers();
        this.closeItemChangeStateModal();
      });
    } else {
      this.changeStateUserError = true;
      setTimeout(() => {
        this.changeStateUserError = false;
      }, 2000);
    }

  }
  openCreateUserModal() {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal() {
    this.showCreateUserModal = false;
  }
  createUser() {
    let invalid = false;
    const firstName = document.getElementById('input-user-first-name') as HTMLInputElement;
    const lastName = document.getElementById('input-user-last-name') as HTMLInputElement;
    const age = document.getElementById('input-user-age') as HTMLInputElement;
    const phone = document.getElementById('input-user-phone') as HTMLInputElement;
    const email = document.getElementById('input-user-email') as HTMLInputElement;

    if (firstName.value == "") {
      invalid = true;
      this.showFirstNameError = true;
      setTimeout(() => {
        this.showFirstNameError = false;
      }, 2000);
    }
    if (lastName.value == "") {
      invalid = true;
      this.showLastNameError = true;
      setTimeout(() => {
        this.showLastNameError = false;
      }, 2000);
    }
    if (lastName.value == "") {
      invalid = true;
      this.showLastNameError = true;
      setTimeout(() => {
        this.showLastNameError = false;
      }, 2000);
    }
    if (age.value == "") {
      invalid = true;
      this.showAgeError = true;
      setTimeout(() => {
        this.showAgeError = false;
      }, 2000);
    }
    if (phone.value == "") {
      invalid = true;
      this.showPhoneError = true;
      setTimeout(() => {
        this.showPhoneError = false;
      }, 2000);
    }
    if (email.value == "" || !email.value.includes("@")) {
      invalid = true;
      this.showEmailError = true;
      setTimeout(() => {
        this.showEmailError = false;
      }, 2000);
    }
    if (invalid) {
      return;
    } else {
      const user = new UserDto("", firstName.value, lastName.value, email.value, phone.value, "", parseInt(age.value), "", this.genderType);
      this.usersSubscription = this.usersService.createUser(user).subscribe({
        next: (response) => {
          if (response != null) {
            this.getUsers();
            this.closeCreateUserModal();
          } else {
            this.createUserError = true;
            setTimeout(() => {
              this.createUserError = false;
            }, 2000);
          }

        }
      })
    }
  }
  onGenderChange(value: string) {
    this.genderType = value;
  }
  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
