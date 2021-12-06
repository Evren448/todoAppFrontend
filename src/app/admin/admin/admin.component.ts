import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/guest/models/role-enum';
import { User } from 'src/app/guest/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Array<User> = [];
  errorMessage: string = "";
  currentUser : User = new User();
  userPage : Boolean = true;

  @ViewChild(TodoComponent) child: TodoComponent | undefined;
  constructor(private userService : UserService, private authService : AuthService) { }

  ngOnInit(): void {
    // this.userService.getAllUsers().subscribe(data =>{
    //   this.userList = data.data;
    // })
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
    this.findAllUsers();
  }

  paging(bool : Boolean){
    this.userPage = bool;
  }

  findAllUsers() : any{
      this.userService.getAllUsers().subscribe(data =>{
      this.userList = data.data;
    }, err =>{
      this.errorMessage = "Unexpected error";
      console.log(err);
    })
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }
}
