import { Component, OnInit, OnDestroy } from '@angular/core';
import {InventoryService} from "./inventory.service";
import {forkJoin, Subscription} from "rxjs";
import {InventoryDto} from "../../dto/InventoryDto";
import {ItemDto} from "../../dto/ItemDto";

@Component({
  selector: 'app-tables',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventories: InventoryDto[] = [];
  items: ItemDto[] = [];
  inventorySubscription: Subscription;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getItemNames();
    this.getInventoryWithItemNames();
  }
  getItemNames() {
    this.inventorySubscription = this.inventoryService.getItems().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  getInventoryWithItemNames() {
    this.inventorySubscription = this.inventoryService.getInventories().subscribe({
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

  ngOnDestroy() {
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }
}
