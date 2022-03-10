import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {BehaviorSubject, map, Observable, take} from 'rxjs';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user
      .pipe(
        take(1),
        map((user) => {
          let previousUrl;

          (this.authService.currentUrl.value) ?
            previousUrl = this.authService.currentUrl.value :
            previousUrl = new BehaviorSubject<string>('/auth');

          this.authService.currentUrl.next(null);
          const isAuth = !!user;
          return (isAuth) ? true : this.router.createUrlTree([previousUrl.value]);
          // or could be return (user) ? true : false;
        })
      );
  }

}
