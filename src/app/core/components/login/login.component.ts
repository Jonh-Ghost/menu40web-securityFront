import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WindowRef } from '../../browser-native/window-native.element';
import { TokenService } from '../../services/authService/token.service';
import { LoginService } from '../../services/login/login.service';
import { jwtDecode }  from 'jwt-decode';
import { UiService } from '../../services/ui/ui.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']    
})
export class LoginComponent implements OnInit {

  pageTitle = 'Inicio de sesión';
  showProgressBar = false;
  isLogged = false;
  isLoginFail = false;
  nombreUsuario?: string ;
  password?: string;
  roles: string[] = [];
  errMsj?: string;
  constructor(
    private title: Title,
    private loginService: LoginService,
    private router: Router,
    private windowRef: WindowRef,
    private tokenService: TokenService,
    private uiService: UiService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.title.setTitle(`${this.pageTitle}${environment.page.suffix}`);
  }

  onLogin(data: any) {
   console.log('Llamar al servicio de login para Owner');
    console.log(data);
    this.loginService.loginOwner(data).subscribe((response: any) => {
      console.log(response);
      const token = response.datos.token;
      const tokenPayload: any = jwtDecode(token);
      this.tokenService.setToken(token);
      this.tokenService.setAuthorities(tokenPayload.role);
      this.router.navigate(['/owner']);
      this.tokenService.setUserName(tokenPayload.nombre);
      this.tokenService.setId(tokenPayload.idOwner)
      this.tokenService.IsLogeo; 
      this.router.navigate(['/owner/owners']);
    },
    err => {
      this.isLogged = false;
      this.errMsj = err.error.message;
      console.log(this.errMsj, 'fail');
      // console.log(err.error.message);
      this.uiService.showErrorAlert('Credenciales incorrectas');
    }
  );
  this.appComponent.ngOnInit();


}
}
