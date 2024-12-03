import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const IS_LOGIN = 'STATE';
const ID_LOGGING = 'ID_LOGGING';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(nombre: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, nombre);
  }

  public getUserName(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  
  public setId(idOwner: any): void {
    window.sessionStorage.removeItem(ID_LOGGING);
    window.sessionStorage.setItem(ID_LOGGING, idOwner);
  }

  public getId(): string | null {
    return sessionStorage.getItem(ID_LOGGING);
  }

  public setAuthorities(authorities:string): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
  }

  public getAuthorities(): string | null {
    console.log(window.sessionStorage.getItem(AUTHORITIES_KEY));
    return window.sessionStorage.getItem(AUTHORITIES_KEY);
  }

  public IsLogeo(): void{
    window.sessionStorage.removeItem(IS_LOGIN);
    window.sessionStorage.setItem(IS_LOGIN, 'true');
  }

  public NoLogeo(): void{
    window.sessionStorage.removeItem(IS_LOGIN);
    window.sessionStorage.setItem(IS_LOGIN, 'false');
  }

  public  on_session(): boolean{
    const session = window.sessionStorage.getItem(IS_LOGIN);
    if(session){
      return true;
    }else{
      return false;
    }
  }

  public logOut(): void{
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.sessionStorage.setItem('STATE', 'false');
  }
}
