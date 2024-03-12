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
  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

}
