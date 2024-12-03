import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../../services/authService/token.service';
//import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';
0
@Injectable({
  providedIn: 'root'
})
export class GuardService {

  isLoggin = false;
  roleAs?: string | null;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(){
    this.isLoggin = true;                                                                           
    this.roleAs = this.tokenService.getAuthorities();
    window.sessionStorage.setItem('STATE', 'true');
    return of({ success: this.isLoggin, role: this.roleAs });
  }

  logout() {
    this.isLoggin = false;
    this.roleAs = '';
    window.sessionStorage.setItem('STATE', 'false');
    window.sessionStorage.setItem('AuthAuthorities', '');
    return of({ success: this.isLoggin, role: '' });
  }

  isLogginIn(){
    console.log("al entrara en el metod isLoggin da el state:");
    console.log(window.sessionStorage.getItem('STATE'));
    const LogginIn = window.sessionStorage.getItem('STATE');
    if(LogginIn == 'true'){
      this.isLoggin = true;
    }else{ 
      this.isLoggin = false;
      this.logout();
    }  
    return this.isLoggin;
  }

  getRole(){
    this.roleAs = this.tokenService.getAuthorities();
    return this.roleAs;
  }
  }
