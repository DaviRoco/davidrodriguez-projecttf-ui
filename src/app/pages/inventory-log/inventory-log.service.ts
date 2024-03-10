import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {InventoryLogDto} from "../../dto/InventoryLogDto";

@Injectable({
  providedIn: 'root'
})
export class InventoryLogService {
  apiUrlInventoryLog = `${environment.rootUrl}/inventory-log`;
  constructor(private http: HttpClient) {
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
