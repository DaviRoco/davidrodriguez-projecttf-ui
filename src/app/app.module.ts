import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
//Custom Components
import { InventoryComponent } from "./pages/inventory/inventory.component";
//Custom Services
import { InventoryService } from "./pages/inventory/inventory.service";
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {DashboardService} from "./pages/dashboard/dashboard.service";
import {InventoryLogService} from "./pages/inventory-log/inventory-log.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {InventoryLogComponent} from "./pages/inventory-log/inventory-log.component";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
