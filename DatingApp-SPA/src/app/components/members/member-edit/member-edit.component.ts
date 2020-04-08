import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private router: Router,
              private userService: UserService) { }
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
      if (!this.user) {
        this.alertify.error('Requested user does not exist.');
        this.router.navigate(['members']);
      }
    });
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated successfully.');
    this.editForm.reset(this.user);
  }

}
