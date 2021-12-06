import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../guest/models/user-model';

const API_URL = `${environment.BASE_URL}/api/admin/users`;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  saveUser(user: User): Observable<any> {
    return this.http.post(API_URL, user);
  }

  updateUser(user : User) : Observable<any>{
    return this.http.put(API_URL,user);

  }
  

  deleteUser(user: User): Observable<any> {
    return this.http.delete( `${API_URL}/${user.id}`);
  }

  getAllUsers() : Observable<any> {
    return this.http.get(API_URL);
    
  }

  findUserById(id : Number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`)

  }
}
