import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import {UsersComponent} from "../../pages/users/users.component";
import {InventoryComponent} from "../../pages/inventory/inventory.component";
import {InventoryLogComponent} from "../../pages/inventory-log/inventory-log.component";
import {AuthGuard} from "../../authentication/authentication.guard";

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
    { path: 'inventory-log', component: InventoryLogComponent, canActivate: [AuthGuard] }
];
