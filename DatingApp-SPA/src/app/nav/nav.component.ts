import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alerrtify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUserMainPhotoUrlObservable.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alerrtify.success('Logged in successfully');
      this.router.navigate(['members']);
    }, error => {
      this.alerrtify.error(error);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    this.authService.clearUserContext();
    this.alerrtify.message('Logged out successfully.');
    this.router.navigate(['home']);
  }

}
