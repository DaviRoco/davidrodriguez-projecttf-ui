import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrlUser = `${environment.rootUrl}/user-by-email/`;

  constructor(private http: HttpClient) {
  }

  getUserByEmailAndPassword(user: UserDto): Observable<any> {
    return this.http.get<any>(this.apiUrlUser + user.email)
  }
}
