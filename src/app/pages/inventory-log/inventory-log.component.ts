import {Component, OnDestroy, OnInit} from '@angular/core';
import {InventoryLogDto} from "../../dto/InventoryLogDto";
import {SubscriptionLog} from "rxjs/internal/testing/SubscriptionLog";
import {Subscription} from "rxjs";
import {InventoryLogService} from "./inventory-log.service";

@Component({
  selector: 'app-tables',
  templateUrl: './inventory-log.component.html',
  styleUrls: ['./inventory-log.component.scss']
})
export class InventoryLogComponent implements OnInit, OnDestroy {
  logs: InventoryLogDto[] = [];
  inventoryLogSubscription: Subscription;
  constructor(private inventoryLogService: InventoryLogService) { }

  ngOnInit() {
    this.getInventoryLogs();
  }
  getInventoryLogs() {
    this.inventoryLogSubscription = this.inventoryLogService.getInventoryLogs().subscribe({
      next: (response) => {
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
