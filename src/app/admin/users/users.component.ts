import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter } from 'src/app/guest/models/filter-model';
import { Role } from 'src/app/guest/models/role-enum';
import { User } from 'src/app/guest/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { TodoModalComponent } from 'src/app/todo-modal/todo-modal.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: Array<User> = [];
  selectedUser: User = new User();
  errorMessage: string = '';
  selectedFilter: Filter = new Filter();
  filterList: any = ['Username ASC', 'Username DESC'];
  filterType: string = '';

  @ViewChild(ModalComponent) child: ModalComponent | undefined;
  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.userList = data.data;
    });
    //this.findAllUsers();
  }

  findAllUsers(): any {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.userList = data.data;
      },
      (err) => {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    );
  }

  findAllUsersFilterByUsername(): any {
    this.userService.getAllUsersFilterDesc().subscribe(
      (data) => {
        this.userList = data.data;
      },
      (err) => {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    );
  }
  findAllUsersFilterByUsernameAsc(): any {
    this.userService.getAllUsersFilterAsc().subscribe(
      (data) => {
        this.userList = data.data;
      },
      (err) => {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    );
  }

  findAllUsersFilterByFullnameDesc(): any {
    this.userService.getAllUsersFullnameFilterDesc().subscribe(
      (data) => {
        this.userList = data.data;
      },
      (err) => {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    );
  }
  findAllUsersFilterByFullnameAsc(): any {
    this.userService.getAllUsersFullnameFilterAsc().subscribe(
      (data) => {
        this.userList = data.data;
      },
      (err) => {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    );
  }

  createUserRequest() {
    this.selectedUser = new User();
    this.child?.showSaveUserModal();
  }

  editUserRequest(item: User) {
    this.selectedUser = Object.assign({}, item);
    this.child?.showUpdateUserModal();
  }

  saveUserWatcher(user: User) {
    let itemIndex = this.userList.findIndex((item) => item.id === user.id);
    if (itemIndex !== -1) {
      this.userList[itemIndex] = user;
    } else {
      this.userList.push(user);
    }
  }

  deleteUser(item: User, ind: number) {
    this.adminService.deleteUser(item).subscribe(
      (data) => {
        this.userList.splice(ind, 1);
      },
      (err) => {
        this.errorMessage = 'Admin kullanicilar silinemez.';
        console.log(err);
      }
    );
  }

  filterChange() {
    switch (this.filterType) {
      case 'UserASC':
        this.findAllUsersFilterByUsernameAsc();
        break;
      case 'UserDESC':
        this.findAllUsersFilterByUsername();
        break;
      case 'FullnameASC':
        this.findAllUsersFilterByFullnameAsc();
        break;
      case 'FullnameDESC':
        this.findAllUsersFilterByFullnameDesc();
        break;
  
    }
  }
}
