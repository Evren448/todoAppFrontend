import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './guest/login/login.component';
import { SignupComponent } from './guest/signup/signup.component';
import { HomeComponent } from './guest/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { TodosComponent } from './todo/todos/todos.component';
import { TodoModalComponent } from './todo-modal/todo-modal.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { TodoComponent } from './admin/todo/todo.component';
import { ModalComponent } from './admin/users/modal/modal.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AdminTodoModalComponent } from './admin/todo/admin-todo-modal/admin-todo-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    TodosComponent,
    TodoModalComponent,
    AdminComponent,
    UsersComponent,
    TodoComponent,
    ModalComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    AdminTodoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
