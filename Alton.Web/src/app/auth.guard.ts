import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UtilService } from './services/util.service';
export function checkRequierd() {
  let secret = localStorage.getItem('secret');
  let token = localStorage.getItem('atoken');
  return secret && token
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
    private utilService: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!checkRequierd()) {
      this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      this.clear();
      return false;
    }
    if (this.utilService.getUserType() === -1) {
      this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      this.clear();
      return false;
    }
    return true;
  }

  clear() {
    localStorage.clear();
  }
}
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _router: Router, private utilService: UtilService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let roles = route.data['roles'];
    let userType = this.utilService.getUserType();
    if (roles && !roles.includes(userType)) {
      let url = this._router.url;
      this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      this.clear();
      return false;
    }
    return true;
  }

  clear() {
    localStorage.clear();
  }
}