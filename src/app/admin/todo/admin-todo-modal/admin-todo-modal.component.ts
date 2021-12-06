import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/guest/models/todo-model';
import { User } from 'src/app/guest/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { TodoserviceService } from 'src/app/services/todoservice.service';
declare var $: any;

@Component({
  selector: 'app-admin-todo-modal',
  templateUrl: './admin-todo-modal.component.html',
  styleUrls: ['./admin-todo-modal.component.css']
})
export class AdminTodoModalComponent implements OnInit {

  errorMessage: string = "";
  postType : boolean | undefined;
  user: User = new User();
  todoStatusList: any = ['TODO', 'DONE', 'DELAYED']

  @Input() todo: Todo = new Todo();
  @Output() save = new EventEmitter<any>();
  constructor(private todoService : TodoserviceService, private authService : AuthService, private adminService : AdminService) { 
   
  }

  ngOnInit(): void {
  }

  saveTodo() {
    //this.todo.user_id = this.authService.currentUserValue.id;
    this.todoService.saveTodo(this.todo).subscribe(data => {

      this.save.emit(data.data);
      $("#todoAdminSaveModal").modal("hide");
      //window.location.reload();
    }, err => {
      this.errorMessage = "Boyle bir kullanici id si bulunmamaktadir.";
      console.log(this.errorMessage);
    })
  }

  updateTodo() {
    //this.todo.user_id = this.authService.currentUserValue.id;


    this.todoService.updateTodo(this.todo).subscribe(data => {


      this.save.emit(data.data);
      $("#todoAdminUpdateModal").modal("hide");
      //window.location.reload();
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
    
   
   
  }

  showSaveTodoModal() {
    $("#todoAdminSaveModal").modal("show");
  }

  showUpdateTodoModal() {
    $("#todoAdminUpdateModal").modal("show");
  }

}
