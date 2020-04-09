import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  currentUserMainPhotoUrlSubject = new BehaviorSubject<string>('../../assets/user.png');
  currentUserMainPhotoUrlObservable = this.currentUserMainPhotoUrlSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateCurrentUserMainPhotoUrl(photoUrl: string){
    this.currentUserMainPhotoUrlSubject.next(photoUrl);
  }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.updateCurrentUserMainPhotoUrl(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setUserContext(){
    const token = localStorage.getItem('token');
    if (token){
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }

    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user){
      this.currentUser = user;
      this.updateCurrentUserMainPhotoUrl(user.photoUrl);
    }

  }

  updateUserContext(photoUrl: string) {
    this.currentUser.photoUrl = photoUrl;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  clearUserContext(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }

}
