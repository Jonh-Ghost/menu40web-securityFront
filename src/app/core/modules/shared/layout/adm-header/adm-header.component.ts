import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TokenService } from 'src/app/core/services/authService/token.service';

@Component({
  selector: 'app-adm-header',
  templateUrl: './adm-header.component.html',
  styleUrls: ['./adm-header.component.scss']
})
export class AdmHeaderComponent implements OnInit {

  @Output() ngExpandSideBar = new EventEmitter<boolean>();
  @Output() ngLogout = new EventEmitter<boolean>();

  expandSideBar = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private appComponent: AppComponent
    ) { }

  ngOnInit(): void {
  }

  notifyExpandSideBar() {
    const on_session = window.sessionStorage.getItem('STATE');
    if (on_session) {
      this.expandSideBar = !this.expandSideBar;
      this.ngExpandSideBar.emit(this.expandSideBar);
    } else {
      this.ngExpandSideBar.emit(true);

    }
  }

  loggout() {
    console.log('Saliendo');
    this.tokenService.logOut();
    this.router.navigate(['']);
    
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.ngLogout.emit(true);
    this.appComponent.ngOnInit();
  }

}
