import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/guest/models/todo-model';
import { User } from 'src/app/guest/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { TodoserviceService } from 'src/app/services/todoservice.service';
import { TodoModalComponent } from 'src/app/todo-modal/todo-modal.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoList: Array<Todo> = [];
  selectedTodo: Todo = new Todo();
  errorMessage: string = "";
  user : User= new User();

  filterType: string = '';


  @ViewChild(TodoModalComponent) child: TodoModalComponent | undefined;
  constructor(private todoService : TodoserviceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.todoService.getUserTodos(this.user).subscribe(data => {
      this.todoList = data.data;
    });
  }

  createTodoRequest() {
    this.selectedTodo = new Todo();
    this.child?.showSaveTodoModal();
  }

  editTodoRequest(item: Todo) {
    this.selectedTodo = Object.assign({}, item);
    this.child?.showUpdateTodoModal();
  }

  saveTodoWatcher(todo: Todo) {
    let itemIndex = this.todoList.findIndex(item => item.id === todo.id);
    if (itemIndex !== -1) {
      this.todoList[itemIndex] = todo;
    } else {
      this.todoList.push(todo);
    }
  }

  deleteTodo(item: Todo, ind: number) {
    this.todoService.deleteTodo(item).subscribe(data => {
      this.todoList.splice(ind, 1);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  getUserTodosByDateASC(){
    return this.todoService.getUserTodosByDateASC(this.user).subscribe(data =>{
      this.todoList = data.data;
    }, err =>{
      this.errorMessage = err;
      console.log(err);
    })
  }

  getUserTodosByDateDESC(){
    return this.todoService.getUserTodosByDateDESC(this.user).subscribe(data =>{
      this.todoList = data.data;
    }, err =>{
      this.errorMessage = err;
      console.log(err);
    })
  }

  filterChange() {
    switch (this.filterType) {
      case 'FDateASC':
        this.getUserTodosByDateASC();
        break;
      case 'FDateDESC':
        this.getUserTodosByDateDESC();
        break; 
    }
  }

}
