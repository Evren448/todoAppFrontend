import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../guest/models/user-model';
import {map} from "rxjs/operators";

const API_URL = `${environment.BASE_URL}/api/auth/`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  

  register(user: User): Observable<any> {
    return this.http.post(API_URL + 'sign-up', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(API_URL + 'sign-in', user).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        }
        return response;
      })
    );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
    window.location.reload();
  }

  
}
