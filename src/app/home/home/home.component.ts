import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberTask } from 'src/app/models/member-task';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toggleRegisterComp = false;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  } 

  toggleRegister(){
    this.toggleRegisterComp = true;
  }

  cancelToggleRegisterMode(toggleRegisterMode: boolean){
    this.toggleRegisterComp = toggleRegisterMode;
  }

  loggedIn(): boolean {
    return this.authSvc.loggedIn();
  }
}
