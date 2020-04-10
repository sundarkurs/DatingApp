import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    const pageNumber = 1;
    const pageSize = 5;

    this.userService.getUsers(pageNumber, pageSize).subscribe((users: PaginatedResult<User[]>) => {
      this.users = users.result;
    }, error => {
      this.alertify.error(error);
    });
  }

}
