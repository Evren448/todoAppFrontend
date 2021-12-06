import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { TodoComponent } from './admin/todo/todo.component';
import { UsersComponent } from './admin/users/users.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { Role } from './guest/models/role-enum';
import { SignupComponent } from './guest/signup/signup.component';
import { TodosComponent } from './todo/todos/todos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'register', component : SignupComponent},
  {path: 'login', component : LoginComponent},
  {path: 'home', component : HomeComponent},

  { path: 'todo',
  component: TodosComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.ADMIN, Role.USER]}
  },

  { path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.ADMIN]}
  },

  //{path: 'todo', component : TodosComponent},
  //{path: 'admin', component : AdminComponent},
  //{path: 'admin/users', component : UsersComponent},
  //{path: 'admin/todos', component : TodoComponent}

  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }

}
