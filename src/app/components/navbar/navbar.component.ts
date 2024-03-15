import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../authentication/authentication.service";
import {UsersService} from "../../pages/users/users.service";
import {NavbarService} from "./navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus: any;
  public listTitles: any[];
  public location: Location;
  userName: string;
  constructor(location: Location,  private element: ElementRef, private router: Router, private authenticationService: AuthenticationService, private userService: UsersService, private navbarService: NavbarService) {
    this.location = location;
  }

  ngOnInit() {
    this.navbarService.getUserByEmail(localStorage.getItem('userEmail')).subscribe({
      next: (response) => {
        this.userName = response.firstName;

      }
    })
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(let item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {
    this.authenticationService.logout();
  }
}
