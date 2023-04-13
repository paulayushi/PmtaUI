import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PMTA-UI';

  constructor(private authSvc: AuthService, private jwtHelper: JwtHelperService){}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authSvc.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
