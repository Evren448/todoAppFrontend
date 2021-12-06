import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user-model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User = new User();
  errorMessage: string = "";

  constructor(private authService: AuthService, private router:Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue?.id) {
      // this.router.navigate(['/home']);
      // return;
    }
  }

  register() {
    this.authService.register(this.user).subscribe(data => {
      this.alertify.success("Basariyla kayit olundu.");
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
      this.alertify.error("Kayit sirasinda bir hata olustu");
        console.log(err);
      }
    })
  }

}
