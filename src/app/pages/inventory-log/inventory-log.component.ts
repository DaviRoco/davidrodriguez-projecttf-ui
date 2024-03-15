import {Component, OnDestroy, OnInit} from '@angular/core';
import {InventoryLogDto} from "../../dto/InventoryLogDto";
import {SubscriptionLog} from "rxjs/internal/testing/SubscriptionLog";
import {Subscription} from "rxjs";
import {InventoryLogService} from "./inventory-log.service";
import {ItemDto} from "../../dto/ItemDto";

@Component({
  selector: 'app-tables',
  templateUrl: './inventory-log.component.html',
  styleUrls: ['./inventory-log.component.scss']
})
export class InventoryLogComponent implements OnInit, OnDestroy {
  logs: InventoryLogDto[] = [];
  items: ItemDto[] = [];
  inventoryLogSubscription: Subscription;
  constructor(private inventoryLogService: InventoryLogService) { }

  ngOnInit() {
    this.getItemNames();
    this.getInventoryLogs();
  }
  getItemNames() {
    this.inventoryLogSubscription = this.inventoryLogService.getItems().subscribe({
      next: (response) => {
        this.items = response;
        this.getInventoryLogs();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
  getInventoryLogs() {
    this.inventoryLogSubscription = this.inventoryLogService.getInventoryLogs().subscribe({
      next: (response) => {
        response.forEach((log: { itemId: BigInt; itemName: string; }) => {
          let itemFound = this.items.find(item => item.id === log.itemId);
          if (itemFound) {
            log.itemName = itemFound.name;
          }
        })
        this.logs = response;
      }
    })
  }
  ngOnDestroy(): void {
    if (this.inventoryLogSubscription) {
      this.inventoryLogSubscription.unsubscribe();
    }
  }
}
