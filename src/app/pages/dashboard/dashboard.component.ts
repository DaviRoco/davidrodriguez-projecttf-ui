import {Component, OnDestroy, OnInit} from '@angular/core';
import {InventoryDto} from "../../dto/InventoryDto";
import {ItemDto} from "../../dto/ItemDto";
import {Subscription} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {InventoryLogDto} from "../../dto/InventoryLogDto";
import {UserDto} from "../../dto/UserDto";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  inventories: InventoryDto[] = [];
  items: ItemDto[] = [];
  logs: InventoryLogDto[] = [];
  users: UserDto[] = [];
  inactiveUsers: UserDto[] = [];
  dashboardSubscription: Subscription;
  stateType: string = 'todo';
  constructor(private dashboardService: DashboardService) {
  }
  ngOnInit() {
    this.getInventoryWithItemNames();
    this.getItemNames();
    this.getInventoryLogs();
    this.getUsers();
  }
  onUpdateStateFilterChange(value: string) {
    this.stateType = value;
    this.getInventoryWithItemNames();
  }
  getItemNames() {
    this.dashboardSubscription = this.dashboardService.getItems().subscribe({
      next: (response) => {
        this.items = response;
        this.getInventoryWithItemNames();
        this.getInventoryLogs();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  getInventoryWithItemNames() {
    this.dashboardSubscription = this.dashboardService.getInventories(this.stateType).subscribe({
      next: (response) => {
        response.forEach((inventory: { itemId: BigInt; itemName: string; }) => {
          let itemFound = this.items.find(item => item.id === inventory.itemId);
          if (itemFound) {
            inventory.itemName = itemFound.name;
          }
        })
        this.inventories = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  getInventoryLogs() {
    this.dashboardSubscription = this.dashboardService.getInventoryLogs().subscribe({
      next: (response) => {
        response.forEach((log: { itemId: BigInt; itemName: string; }) => {
          let itemFound = this.items.find(item => item.id === log.itemId);
          if (itemFound) {
            log.itemName = itemFound.name;
          }
        })
        this.logs = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    })
  }

  getUsers() {
    this.dashboardSubscription = this.dashboardService.getUsers().subscribe({
      next: (response) => {
        response.forEach((user: UserDto) => {
          if (user.state === "Inactivo"){
            this.inactiveUsers.push(user);
          }
        })
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }


}
