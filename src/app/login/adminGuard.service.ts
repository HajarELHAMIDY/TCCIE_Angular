import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map, tap, take } from 'rxjs/operators';
  
  import { AuthentificationService } from './authentification.service';
  
  @Injectable({ providedIn: 'root' })
  export class AdminGuardService implements CanActivate {
    constructor(private authService: AuthentificationService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
      return this.authService.user.pipe(
        take(1),
        map(user => {
          const isAdmin =this.authService.isAdmin();
          
          if (isAdmin) {
            return true;
          }
          return this.router.createUrlTree(['/home']);
        })
      );
    }
  }
  