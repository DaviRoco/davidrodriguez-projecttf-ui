import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {InventoryDto} from "../../dto/InventoryDto";
import {ItemDto} from "../../dto/ItemDto";
import {Injectable} from "@angular/core";
import {InventoryLogDto} from "../../dto/InventoryLogDto";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrlInventory = `${environment.rootUrl}/inventory`;
  apiUrlItem = `${environment.rootUrl}/item`;
  apiUrlInventoryLog = `${environment.rootUrl}/inventory-log`;

  constructor(private http: HttpClient) {
  }

  getInventories(state: string): Observable<any> {
    return this.http.get<any>(this.apiUrlInventory + '?state=' + state).pipe(
      map((inventories: any[]) => {
        return inventories.map(inventory =>
          new InventoryDto(inventory.id, inventory.total, inventory.description, inventory.itemId, "", inventory.state))
      })
    );
  }

  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrlItem).pipe(
      map((items: any[]) => {
        return items.map(item =>
          new ItemDto(item.id, item.name, item.state))
      })
    );
  }

  getInventoryLogs(): Observable<any> {
    return this.http.get<any>(this.apiUrlInventoryLog).pipe(
      map((logs: any[]) => {
        return logs.map(log =>
        new InventoryLogDto(log.id, log.transaction, log.amount, log.itemId, ""))
      })
    )
  }
}
