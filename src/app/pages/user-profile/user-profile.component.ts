import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users/users.service";
import {UserProfileService} from "./user-profile.service";
import {UserDto} from "../../dto/UserDto";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userEmail: string;
  user: UserDto;
  constructor(private userService: UsersService, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileService.getUserByEmail(localStorage.getItem('userEmail')).subscribe({
      next: (response) => {
        this.user = response;
      }
    })
  }

}
