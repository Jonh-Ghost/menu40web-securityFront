import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WindowRef } from '../../browser-native/window-native.element';
import { OwnerModel } from '../../models/owner.model';
import { LoginService } from '../../services/login/login.service';
import { OwnerService } from '../../services/owner/owner.service';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  titlePage = 'Registrate';
  showProgressBar = false;

  constructor(
    private title:Title,
    private loginService: LoginService,
    private windowRef: WindowRef,
    private ownerService: OwnerService,
    private router: Router,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle(`${this.titlePage} ${environment.page.suffix}`);
  }

  save(data: any) {
    console.log('Llamar al servicio de NewAccont para Owner');
    console.log(data);
    this.ownerService.create(data).subscribe((value) => {
      if (value) 
      console.log("exito");
    });
  }
  }
