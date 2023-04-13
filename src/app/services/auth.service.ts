import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  decodedToken: string;  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(model: LoginUser): Observable<any> {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const loginToken = response;
        if (response) {
          localStorage.setItem('token', loginToken.token);
          this.decodedToken = this.jwtHelper.decodeToken(loginToken.token);
        }
      })
    );
  }

  register(user: User): Observable<any>{
    return this.http.post(this.baseUrl + 'add-member', user);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
