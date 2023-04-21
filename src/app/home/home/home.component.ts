import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toggleRegisterComp = false;

  constructor() { }

  ngOnInit(): void {
  } 

  toggleRegister(){
    this.toggleRegisterComp = true;
  }

  cancelToggleRegisterMode(toggleRegisterMode: boolean){
    this.toggleRegisterComp = toggleRegisterMode;
  }
}
