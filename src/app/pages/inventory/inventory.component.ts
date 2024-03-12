import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {InventoryService} from "./inventory.service";
import {InventoryDto} from "../../dto/InventoryDto";
import {ItemDto} from "../../dto/ItemDto";
import {Subscription} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tables',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventories: InventoryDto[] = [];
  items: ItemDto[] = [];
  inventorySubscription: Subscription;
  // show modals for Inventory and Item updates
  showUpdateInventoryModal: boolean = false;
  showUpdateItemModal: boolean = false;
  showDisableItemModal: boolean = false;
  showCreateItemModal: boolean = false;
  //Inventory update variables
  @ViewChild('totalSales') totalSales!: ElementRef<HTMLInputElement>;
  @ViewChild('totalRestock') totalRestock!: ElementRef<HTMLInputElement>;
  updateType: string = 'venta';
  stateType: string = 'todo';
  inventoryId: BigInt;
  selectedItemId: string;
  description: string;
  currentTotal: number;
  inventoryState: string;
  //Item update variables
  itemName: string;
  itemId: BigInt;
  itemState: string;
  //Disable/Soft Delete procedure variables
  warningInstruction: string
  stateChangeItemId: BigInt;
  //Validator variables
  updateInventoryError: boolean;
  updateInventoryErrorMessage: string;
  updateInventorySuccess: boolean = false;
  updateItemError: boolean;
  updateItemSuccess: boolean = false;
  createItemError: boolean;
  createItemSuccess: boolean = false;
  changeStateItemError: boolean;
  changeItemSuccess: boolean = false;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getInventoryWithItemNames();
    this.getItemNames();
  }
  onUpdateTypeChange(value: string) {
    this.updateType = value;
  }
  onUpdateStateFilterChange(value: string) {
    this.stateType = value;
    this.getInventoryWithItemNames();
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
    this.inventorySubscription = this.inventoryService.getInventories(this.stateType).subscribe({
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

  openItemDisableModal(item: ItemDto) {
    this.stateChangeItemId = item.id;
    this.itemState = item.state;
    if (item.state === 'Activo'){
      this.warningInstruction = 'Estás a punto de cambiar el estado del siguiente elemento, esto desactivará inventarios a los que el producto esté ligado. Confirma tu decisión escribiendo "confirmar".'
    } else {
      this.warningInstruction = 'Estás a punto de cambiar el estado del siguiente elemento, esto activará el producto y se podrá utilizar nuevamente. Confirma tu decisión escribiendo "confirmar".'
    }
    this.showDisableItemModal = true;
  }

  closeItemDisableModal() {
    const confirmDelete = document.getElementById('input-confirm-delete') as HTMLInputElement;
    if (confirmDelete.value != "") {
      confirmDelete.value = "";
    }
    this.showDisableItemModal = false;
  }
  changeItemState() {
    const confirmDelete = document.getElementById('input-confirm-delete') as HTMLInputElement;
    if (confirmDelete.value === "confirmar") {
      const itemDto = new ItemDto(this.stateChangeItemId, "", "");
      this.changeItemSuccess = true;
      setTimeout(() => {
        this.changeItemSuccess = false;
      }, 2000);
      this.inventoryService.changeStateItem(itemDto).subscribe(() => {
        this.getItemNames();
        this.closeItemDisableModal();
      });
    } else {
      this.changeStateItemError = true;
      setTimeout(() => {
        this.changeStateItemError = false;
      }, 2000);
    }

  }
  openInventoryUpdateModal(inventory: InventoryDto) {
    this.currentTotal = inventory.total;
    this.inventoryId = inventory.id;
    this.inventoryState = inventory.state
    this.selectedItemId = inventory.itemId;
    this.description = inventory.description;
    const totalInputRestock = document.getElementById('input-total-restock') as HTMLInputElement;
    const totalInputSales = document.getElementById('input-total-sales') as HTMLInputElement;
    if (totalInputRestock) {
      totalInputRestock.value = '0';
    } else {
      totalInputSales.value = '0';
    }
    this.showUpdateInventoryModal = true;

  }

  closeInventoryUpdateModal() {
    this.showUpdateInventoryModal = false;
    this.updateInventoryError = false;
    this.description = '';
  }
  updateInventory() {
    const itemId = document.getElementById('input-item') as HTMLInputElement;
    const description = document.getElementById('input-description') as HTMLInputElement;
    let totalInput: HTMLInputElement;
    let total: number;
    if (description.value != "" && description.value.length > 10){
      if (this.updateType == 'venta') {
        totalInput = document.getElementById('input-total-sales') as HTMLInputElement;
        if (parseInt(totalInput.value) <= this.currentTotal) {
          total = parseInt(totalInput.value) * -1;
        } else {
          this.updateInventoryErrorMessage = "Cantidad de ventas inválida.";
          this.updateInventoryError = true;
          setTimeout(() => {
            this.updateInventoryError = false;
          }, 2000);
          return;
        }
      } else {
        totalInput = document.getElementById('input-total-restock') as HTMLInputElement;
        total = parseInt(totalInput.value);
      }
      const newInventory = new InventoryDto(this.inventoryId, total, description.value, itemId.value, "", this.inventoryState)
      this.updateInventorySuccess = true;
      setTimeout(() => {
        this.updateInventorySuccess = false;
      }, 2000);
      this.inventoryService.updateInventory(newInventory).subscribe(() => {
        this.getInventoryWithItemNames();
        this.closeInventoryUpdateModal();
      })
    } else {
      this.updateInventoryErrorMessage = "Descripción inválida.";
      this.updateInventoryError = true;
      setTimeout(() => {
        this.updateInventoryError = false;
      }, 2000);
    }

  }
  openItemUpdateModal(item: ItemDto) {
    this.itemId = item.id;
    this.itemName = item.name;
    this.showUpdateItemModal = true;
  }

  closeItemUpdateModal() {
    this.updateItemError = false;
    this.showUpdateItemModal = false;
  }
  updateItem() {
    const itemName = document.getElementById('input-item-name') as HTMLInputElement;
    if (itemName.value != "" && itemName.value.length > 3){
      const newItem = new ItemDto(this.itemId, itemName.value, "");
      this.updateItemSuccess = true;
      setTimeout(() => {
        this.updateItemSuccess = false;
      }, 2000);
      this.inventoryService.updateItem(newItem).subscribe(() => {
        this.getItemNames();
        this.closeItemUpdateModal();
      })
    } else {
      this.updateItemError = true;
      setTimeout(() => {
        this.updateItemError = false;
      }, 2000);
    }

  }

  openCreateItemModal() {
    this.showCreateItemModal = true;
  }

  closeCreateItemModal() {
    const itemName = document.getElementById('input-item-create-name') as HTMLInputElement;
    if (itemName.value != "") {
      itemName.value = "";
    }
    this.showCreateItemModal = false;
  }
  createItem() {
    const itemName = document.getElementById('input-item-create-name') as HTMLInputElement;
    if (itemName.value != "" && itemName.value.length > 3){
      const newItem = new ItemDto(null, itemName.value, null);
      this.createItemSuccess = true;
      setTimeout(() => {
        this.createItemSuccess = false;
      }, 2000);
      this.inventoryService.createItem(newItem).subscribe(() => {
        this.getItemNames();
        this.closeCreateItemModal();
      })
    } else {
      this.createItemError = true;
      setTimeout(() => {
        this.createItemError = false;
      }, 2000);
    }

  }

  ngOnDestroy() {
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }

}
