import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../guest/models/todo-model';
import { AuthService } from '../services/auth.service';
import { TodoserviceService } from '../services/todoservice.service';
declare var $: any;

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit {



  errorMessage: string = "";
  postType : boolean | undefined;

  todoStatusList: any = ['TODO', 'DONE', 'DELAYED']

  @Input() todo: Todo = new Todo();
  @Output() save = new EventEmitter<any>();
  constructor(private todoService : TodoserviceService, private authService : AuthService) { }
  ngOnInit(): void {
  }

  saveTodo() {
    this.todo.user_id = this.authService.currentUserValue.id;
    this.todoService.saveTodo(this.todo).subscribe(data => {
      this.save.emit(data.data);
      $("#todoSaveModal").modal("hide");
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
    
   
   
  }

  updateTodo() {
    this.todo.user_id = this.authService.currentUserValue.id;
    this.todoService.updateTodo(this.todo).subscribe(data => {
      this.save.emit(data.data);
      $("#todoUpdateModal").modal("hide");
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
    
   
   
  }

  showSaveTodoModal() {
    $("#todoSaveModal").modal("show");
  }

  showUpdateTodoModal() {
    $("#todoUpdateModal").modal("show");
  }


}
