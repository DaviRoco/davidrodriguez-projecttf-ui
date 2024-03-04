import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import {UsersComponent} from "../../pages/users/users.component";
import {InventoryComponent} from "../../pages/inventory/inventory.component";
import {InventoryLogComponent} from "../../pages/inventory-log/inventory-log.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',      component: UsersComponent },
    { path: 'inventory',      component: InventoryComponent },
    { path: 'inventory-log',      component: InventoryLogComponent },
    { path: 'icons',          component: IconsComponent }
];
