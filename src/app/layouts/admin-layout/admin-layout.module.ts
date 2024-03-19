import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InventoryComponent} from "../../pages/inventory/inventory.component";
import {InventoryLogComponent} from "../../pages/inventory-log/inventory-log.component";
import {InventoryService} from "../../pages/inventory/inventory.service";
import {DashboardService} from "../../pages/dashboard/dashboard.service";
import {InventoryLogService} from "../../pages/inventory-log/inventory-log.service";
import {UsersService} from "../../pages/users/users.service";
import {UsersComponent} from "../../pages/users/users.component";
import {UserProfileService} from "../../pages/user-profile/user-profile.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    UserProfileComponent,
    TablesComponent,
    MapsComponent,
    InventoryComponent,
    DashboardComponent,
    InventoryLogComponent,
    UsersComponent
  ],
  providers: [
    InventoryService,
    DashboardService,
    InventoryLogService,
    UsersService,
    UserProfileService
  ],
})

export class AdminLayoutModule {}
