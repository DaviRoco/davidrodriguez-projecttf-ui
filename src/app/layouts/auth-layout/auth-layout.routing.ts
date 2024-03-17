import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import {ChangePasswordComponent} from "../../pages/change-password/change-password.component";
import {ResetPasswordComponent} from "../../pages/reset-password/reset-password.component";

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'change-password',          component: ChangePasswordComponent },
    { path: 'reset-password',          component: ResetPasswordComponent }
];
