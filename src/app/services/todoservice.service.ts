import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../guest/models/todo-model';
import { User } from '../guest/models/user-model';
import { AuthService } from './auth.service';

const API_URL = `${environment.BASE_URL}/api/todo/todo`;

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  currentUser: User = new User;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }


  saveTodo(todo: Todo): Observable<any> {
    return this.http.post(API_URL, todo);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(API_URL, todo);
  }

  getAllTodos(): Observable<any> {
    return this.http.get(API_URL);
  }

  getUserTodos(user : User): Observable<any> {
    return this.http.get(`${API_URL}/user/${user.id}`);
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete( `${API_URL}/${todo.id}`);
  }

  getAllTodosByDateASC() : Observable<any> {
    return this.http.get(`${API_URL}/asc`);
    
  }

  getAllTodosByDateDESC() : Observable<any> {
    return this.http.get(`${API_URL}/desc`);
    
  }

  getUserTodosByDateASC(user : User): Observable<any> {
    return this.http.get(`${API_URL}/asc/${user.id}`);
  }

  getUserTodosByDateDESC(user : User): Observable<any> {
    return this.http.get(`${API_URL}/desc/${user.id}`);
  }

}
