import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthenticationGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn: boolean = this.authService.hasLoggedUser();
    if (!isLoggedIn) {
      console.log('auth guard logged');
      this.router.navigateByUrl('/authentication/login');
      return isLoggedIn;
    }
    else{
      console.log('auth guard logged')
    }
    return isLoggedIn;
  }
  constructor(private authService: AuthenticationService,
              private router: Router) { }
}
