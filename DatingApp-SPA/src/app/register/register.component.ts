import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
  }

  cancel(){
    console.log('Cancel from child.');
    this.cancelRegister.emit(false);
  }

}
