import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../guest/models/user-model';
import { AuthService } from './auth.service';

const API_URL = `${environment.BASE_URL}/api/admin`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = new User;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  getAllUsers() : Observable<any> {
    return this.http.get(`${API_URL}/users`);
    
  }

  getAllUsersFilterDesc() : Observable<any> {
    return this.http.get(`${API_URL}/users/usernameDesc`);
    
  }

  getAllUsersFilterAsc() : Observable<any> {
    return this.http.get(`${API_URL}/users/usernameAsc`);
    
  }

  getAllUsersFullnameFilterDesc() : Observable<any> {
    return this.http.get(`${API_URL}/users/fullnameDesc`);
    
  }

  getAllUsersFullnameFilterAsc() : Observable<any> {
    return this.http.get(`${API_URL}/users/fullnameAsc`);
    
  }
}
