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
export class AuthenticatedGuard implements CanActivate {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.isAuthenticated.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuthenticated) {
      return true;
    }
    void this.router.navigate([route.queryParams['returnUrl'] ?? ''], { replaceUrl: true });
    return false;
  }
}
