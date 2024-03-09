import { Component, OnInit, OnDestroy } from '@angular/core';
import {InventoryService} from "./inventory.service";
import {InventoryDto} from "../../dto/InventoryDto";
import {ItemDto} from "../../dto/ItemDto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tables',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventories: InventoryDto[] = [];
  items: ItemDto[] = [];
  inventorySubscription: Subscription;
  showModal: boolean = false;
  updateType: string = 'venta';
  inventoryId: BigInt;
  selectedItemId: string;
  description: string;
  currentTotal: number;
  salesError: boolean;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getItemNames();
  }
  getItemNames() {
    this.inventorySubscription = this.inventoryService.getItems().subscribe({
      next: (response) => {
        this.items = response;
        this.getInventoryWithItemNames();
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
  openUpdateModal(inventory: InventoryDto) {
    const totalInputSales = document.getElementById('input-total-sales') as HTMLInputElement;
    const totalInputRestock = document.getElementById('input-total-restock') as HTMLInputElement;
    this.currentTotal = inventory.total;
    this.inventoryId = inventory.id;
    this.selectedItemId = inventory.itemId;
    this.description = inventory.description;
    this.showModal = true;

    totalInputRestock.value = '';
    totalInputSales.value = '';
  }

  closeModal() {
    this.showModal = false;
    this.salesError = false;
    const descriptionInput = document.getElementById('input-description') as HTMLInputElement;
    descriptionInput.value = '';
  }

  onUpdateTypeChange(value: string) {
    this.updateType = value;
  }

  updateInventory() {
    const itemId = document.getElementById('input-item') as HTMLInputElement;
    const description = document.getElementById('input-description') as HTMLInputElement;
    let totalInput: HTMLInputElement;
    let total: number;
    if (this.updateType == 'venta') {
      totalInput = document.getElementById('input-total-sales') as HTMLInputElement;
      if (parseInt(totalInput.value) <= this.currentTotal) {
        total = parseInt(totalInput.value) * -1;
      } else {
        this.salesError = true;
        return;
      }
    } else {
      totalInput = document.getElementById('input-total-restock') as HTMLInputElement;
      total = parseInt(totalInput.value);
    }
    const newInventory = new InventoryDto(this.inventoryId, total, description.value, itemId.value, "")
    this.inventoryService.updateInventory(newInventory).subscribe(() => {
      this.getInventoryWithItemNames();
      this.closeModal();
    })
  }

  ngOnDestroy() {
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }
}
