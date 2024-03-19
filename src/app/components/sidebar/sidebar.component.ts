import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-chart-bar-32 text-primary', class: '' },
    { path: '/user-profile', title: 'Perfil',  icon:'ni-single-02 text-orange', class: '' },
    { path: '/users', title: 'Usuarios',  icon: 'ni-badge text-green', class: '' },
    { path: '/inventory', title: 'Inventario',  icon: 'ni-app text-gray-dark', class: '' },
    { path: '/inventory-log', title: 'Historial',  icon: 'ni-archive-2 text-red', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
