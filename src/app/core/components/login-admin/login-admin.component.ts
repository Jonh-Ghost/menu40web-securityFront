import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { WindowRef } from "../../browser-native/window-native.element";
import { TokenService } from "../../services/authService/token.service";
import { LoginService } from "../../services/login/login.service";
import { jwtDecode } from 'jwt-decode';
import { UiService } from "../../services/ui/ui.service";
import { AppComponent } from "src/app/app.component";




@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})

export class LoginAdminComponent implements OnInit {
  
  pageTitle = 'Inicio de sesión';
  showProgressBar = false;
  isLogged = false;
  isLoginFail = false;
  nombreUsuario?: string ;
  password?: string;
  roles: string[] = [];
  errMsj?: string;

  
  constructor(
    private title:Title,
    private tokenService: TokenService,
    private loginService: LoginService,
    private windowRef: WindowRef,
    private uiService: UiService,    
    private router: Router,
    private appComponent: AppComponent
 
    
  ) { }

    
  ngOnInit() {
    this.appComponent.ngOnInit();
  }
  onLogin(data: any) {
    console.log('Llamar al servicio de login');
    console.log(data);
    this.loginService.loginAdmin(data).subscribe((response: any) => {
      console.log(response);
      const token = response.datos.token;
      const tokenPayload: any = jwtDecode(token);
      this.tokenService.setToken(token);
      this.tokenService.setAuthorities(tokenPayload.role);
      this.tokenService.setUserName(tokenPayload.nombre);
      this.router.navigate(['/administrador']);
    },
    err => {
      this.isLogged = false;
      this.errMsj = err.error.message;
      console.log(this.errMsj, 'fail');
      // console.log(err.error.message);
      this.uiService.showErrorAlert('Credenciales incorrectas');
    }
  );
}

}