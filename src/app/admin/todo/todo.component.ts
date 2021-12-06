import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/guest/models/todo-model';
import { TodoserviceService } from 'src/app/services/todoservice.service';
import { AdminTodoModalComponent } from './admin-todo-modal/admin-todo-modal.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList: Array<Todo> = [];
  selectedTodo: Todo = new Todo();
  errorMessage: string = "";

  filterType: string = '';


  @ViewChild(AdminTodoModalComponent) child: AdminTodoModalComponent | undefined;
  constructor(private todoService : TodoserviceService) { }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe(data => {
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

  getAllTodosByDateASC(){
    return this.todoService.getAllTodosByDateASC().subscribe(data =>{
      this.todoList = data.data;
    }, err =>{
      this.errorMessage = err;
      console.log(err);
    })
  }

  getAllTodosByDateDESC(){
    return this.todoService.getAllTodosByDateDESC().subscribe(data =>{
      this.todoList = data.data;
    }, err =>{
      this.errorMessage = err;
      console.log(err);
    })
  }

  filterChange() {
    switch (this.filterType) {
      case 'FDateASC':
        this.getAllTodosByDateASC();
        break;
      case 'FDateDESC':
        this.getAllTodosByDateDESC();
        break; 
    }
  }

}
