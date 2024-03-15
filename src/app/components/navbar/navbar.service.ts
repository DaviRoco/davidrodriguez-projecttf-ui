import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  apiUrlUser = `${environment.rootUrl}/user-by-email/`;
  constructor(private http: HttpClient) {
  }
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.apiUrlUser + email)
  }
}
