import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private _authSvc: AuthService, private router: Router, private toastrSvc: ToastrService) {};
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (this._authSvc.loggedIn()) {
          return true;
      }
        this.toastrSvc.error('You are not allowed to navigate to this page. Please login to navigate!');
        this.router.navigate(['home']);
        return false;
    }
  }