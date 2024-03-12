import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}

  onUserActivity(): void {
    this.authService.updateLastActivityTime();
  }
  ngOnInit() {
  }

}
