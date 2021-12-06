import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string = "";

  constructor(private authService : AuthService, private router : Router, private alertify: AlertifyService) { }

  ngOnInit(): void {

  }


  login(){
    
    this.authService.login(this.user).subscribe(data =>{
      this.alertify.success("Basariyla login olundu.");
      this.router.navigate(['/home']);
      //window.location.reload(); ????
      
    }, err =>{
      this.errorMessage = "Username or password is incorrect";
      this.alertify.error("Login sirasinda bir hata olustu");
      console.log(err)
    });
  }

}
