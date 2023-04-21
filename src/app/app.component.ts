import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PMTA-UI';

  constructor(private authSvc: AuthService, private jwtHelper: JwtHelperService,
            private router: Router, private toastrSvc: ToastrService){}
  
  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  loggedIn(): boolean {
    return this.authSvc.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
    this.toastrSvc.info('Logged out successfully.');
  }
}
