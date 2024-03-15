import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {InventoryLogDto} from "../../dto/InventoryLogDto";
import {ItemDto} from "../../dto/ItemDto";

@Injectable({
  providedIn: 'root'
})
export class InventoryLogService {
  apiUrlInventoryLog = `${environment.rootUrl}/inventory-log`;
  apiUrlItem = `${environment.rootUrl}/item`;
  constructor(private http: HttpClient) {
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
          new InventoryLogDto(log.id, log.transaction, log.amount, log.itemId))
      })
    )
  }
}
