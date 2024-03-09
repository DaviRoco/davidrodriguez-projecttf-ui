import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {InventoryDto} from "../../dto/InventoryDto";
import {ItemDto} from "../../dto/ItemDto";
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiUrlInventory = `${environment.rootUrl}/inventory`;
  apiUrlItem = `${environment.rootUrl}/item`;

  constructor(private http: HttpClient) {
  }

  getInventories(): Observable<any> {
    return this.http.get<any>(this.apiUrlInventory).pipe(
      map((inventories: any[]) => {
        return inventories.map(inventory =>
          new InventoryDto(inventory.id, inventory.total, inventory.description, inventory.itemId, ""))
      })
    );
  }

  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrlItem).pipe(
      map((items: any[]) => {
        return items.map(item =>
          new ItemDto(item.id, item.name))
      })
    );
  }
}
