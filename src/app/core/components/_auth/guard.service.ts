import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { TokenService } from '../../services/authService/token.service';
import { GuardService } from './guardService.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate, CanLoad {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: GuardService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    console.log("Esto trae el checkUserLogin: ");
    console.log(this.checkUserLogin(next, url));
    console.log(url);
    console.log(next);
    return this.checkUserLogin(next, url);

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //throw new Error('Method not implemented.');
    return true;
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    this.authService.login();
    console.log(" Entramos al ActivatedRouteSnapshot");
    console.log(this.authService.isLogginIn());
    if (this.authService.isLogginIn()) {
      console.log("Entrando al authService el metod isLoggin:");
      console.log(this.authService.isLogginIn());
      const userRole = this.authService.getRole();
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        console.log("entre el segundo if esto me dio en index");
        console.log(route.data.role.indexOf(userRole));
        return true;
      }
      console.log("termine el primer if con un true");
      return true;
    }
    console.log("sucede que me quede en el boolean de snashop y fui al gom directo men");
    this.router.navigate(['']);
    return false;
  }
}
