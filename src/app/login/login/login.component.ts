import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginUser = new LoginUser();

  constructor(private authSvc: AuthService, 
    private router: Router, private toastrSvc: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.authSvc.login(this.user).subscribe(
      next => {
        this.toastrSvc.success('Logged in successfully.');
        this.router.navigate(['member-search']);
      },
      error => {
        this.toastrSvc.error('Please enter your valid credential!');
      }
    );
  }
}
