/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShouldAuthenticateGuard implements CanActivate {
  isAuthenticated = false;
  isLogout = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.isAuthenticated.subscribe((value) => {
      this.isAuthenticated = value;
    });
    authService.user.subscribe((value) => {
      this.isLogout = !value;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated) {
      return true;
    }

    void this.router.navigate(['/login'], {
      replaceUrl: true,
      queryParams: this.isLogout ? {} : { returnUrl: state.url },
    });
    return false;
  }
}
