import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  titles: string[] = ['Mr', 'Miss', 'Mrs'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean){
    console.log('Event received from Child.');
    this.registerMode = registerMode;
  }

}
