import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Role } from 'src/app/guest/models/role-enum';
import { User } from 'src/app/guest/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  errorMessage : string = "";
    
  roleList: any = ['ADMIN', 'USER']
  @Input() user: User = new User();
  @Output() save = new EventEmitter<any>();
  constructor(private authService : AuthService, private adminService : AdminService) {
  
   }

  ngOnInit(): void {
  }

  saveUser() {

    this.adminService.saveUser(this.user).subscribe(data => {
      this.save.emit(data.data);
      $("#userSaveModal").modal("hide");
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  updateUser() {

    this.adminService.updateUser(this.user).subscribe(data => {
      this.save.emit(data.data);
      $("#userUpdateModal").modal("hide");
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err.error
        console.log(err);
      }
    })
  }

  closeSaveModal(){
    $("#userSaveModal").modal("hide");
  }

  closeUpdateModal(){
    $("#userUpdateModal").modal("hide");
  }

  showSaveUserModal(){
    $("#userSaveModal").modal("show");
  }

  showUpdateUserModal(){
    $("#userUpdateModal").modal("show");
  }
}
