import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';
import { UserParams } from 'src/app/_models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  users: User[];
  user: User = this.authService.currentUser;
  pagination = new Pagination();
  userParams: UserParams;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' }
  ];

  constructor(private userService: UserService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    const gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams = new UserParams(gender);

    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.userParams, this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((users: PaginatedResult<User[]>) => {
      this.users = users.result;
      this.pagination = users.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    const gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams = new UserParams(gender);
    this.loadUsers();
  }

}
