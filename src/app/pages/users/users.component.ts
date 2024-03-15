import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserDto} from "../../dto/UserDto";
import {UsersService} from "./users.service";
import {Subscription} from "rxjs";
import {ItemDto} from "../../dto/ItemDto";

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
      const userDto = new UserDto(this.stateChangeUserId, "", "", "", "", "", 0, "");
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
  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
