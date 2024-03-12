import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserDto} from "../../dto/UserDto";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  apiUrlUser = `${environment.rootUrl}/user`;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrlUser).pipe(
      map((users: any[]) => {
        return users.map(user =>
        new UserDto(user.id, user.firstName, user.lastNames, user.email, user.phone, user.password, user.age, user.state))
      })
    )
  }
}
