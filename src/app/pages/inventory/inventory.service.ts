import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  updateInventory(inventory: InventoryDto): Observable<any> {
    return this.http.put<any>(this.apiUrlInventory, inventory);
  }

  updateItem(item: ItemDto): Observable<any> {
    return this.http.put<any>(this.apiUrlItem, item);
  }
  changeStateItem(item: ItemDto): Observable<any> {
    return this.http.put<any>(this.apiUrlItem + '/state-change', item);
  }
  deleteItem(item: ItemDto): Observable<any> {
    return this.http.delete(this.apiUrlItem, {
      body: item ,
      responseType: 'text'
    });
  }

  deleteInventory(inventory: InventoryDto): Observable<any> {
    return this.http.delete(this.apiUrlInventory, {
      body: inventory,
      responseType: 'text'
    });
  }
}
