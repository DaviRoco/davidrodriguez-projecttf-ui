import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
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
  // show modals for Inventory and Item updates
  showInventoryModal: boolean = false;
  showItemModal: boolean = false;
  showDisableModal: boolean = false;
  //Inventory update variables
  @ViewChild('totalSales') totalSales!: ElementRef<HTMLInputElement>;
  @ViewChild('totalRestock') totalRestock!: ElementRef<HTMLInputElement>;
  updateType: string = 'venta';
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
  //Error variables
  salesError: boolean;
  salesErrorMessage: string;
  deleteError: boolean;
  deleteErrorMessage: string;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getInventoryWithItemNames();
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
    this.showInventoryModal = true;

  }

  closeInventoryUpdateModal() {
    this.showInventoryModal = false;
    this.salesError = false;
    this.description = '';
  }

  openItemUpdateModal(item: ItemDto) {
    this.itemId = item.id;
    this.itemName = item.name;
    this.showItemModal = true;
  }

  closeItemUpdateModal() {
    this.showItemModal = false;
  }

  openItemDisableModal(item: ItemDto) {
    this.stateChangeItemId = item.id;
    this.itemState = item.state;
    if (item.state === 'activo'){
      this.warningInstruction = 'Estás a punto de cambiar el estado del siguiente elemento, esto desactivará inventarios a los que el producto esté ligado. Confirma tu decisión escribiendo "confirmar".'
    } else {
      this.warningInstruction = 'Estás a punto de cambiar el estado del siguiente elemento, esto activará el producto y se podrá utilizar nuevamente. Confirma tu decisión escribiendo "confirmar".'
    }
    this.showDisableModal = true;
  }

  closeItemDisableModal() {
    this.showDisableModal = false;
  }

  changeItemState() {
      const itemDto = new ItemDto(this.stateChangeItemId, "", "");
      this.inventoryService.changeStateItem(itemDto).subscribe(() => {
        this.getItemNames();
        this.closeItemDisableModal();
      });
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
        this.salesErrorMessage = "Cantidad de ventas inválida.";
        this.salesError = true;
        return;
      }
    } else {
      totalInput = document.getElementById('input-total-restock') as HTMLInputElement;
      total = parseInt(totalInput.value);
    }
    const newInventory = new InventoryDto(this.inventoryId, total, description.value, itemId.value, "", this.inventoryState)
    this.inventoryService.updateInventory(newInventory).subscribe(() => {
      this.getInventoryWithItemNames();
      this.closeInventoryUpdateModal();
    })
  }

  updateItem() {
    const itemName = document.getElementById('input-item-name') as HTMLInputElement;
    const newItem = new ItemDto(this.itemId, itemName.value, "");
    this.inventoryService.updateItem(newItem).subscribe(() => {
      this.getItemNames();
      this.closeItemUpdateModal();
    })
  }
  onUpdateTypeChange(value: string) {
    this.updateType = value;
  }

  ngOnDestroy() {
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }

}
