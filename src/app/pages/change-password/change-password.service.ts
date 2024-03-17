import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  apiUrlUser = `${environment.rootUrl}/user`;
  apiUrlUserEmail = `${environment.rootUrl}/user-by-email/`;
  constructor(private http: HttpClient) {
  }
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.apiUrlUserEmail + email)
  }

  updateUser(user: UserDto): Observable<any> {
    return this.http.put<any>(this.apiUrlUser, user);
  }
}
