import { FlatTreeControl } from '@angular/cdk/tree';
import { Token } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Route, Router } from '@angular/router';
import { WindowRef } from './core/browser-native/window-native.element';
import { GuardService } from './core/components/_auth/guardService.service';
import { FlatMenuItem, MenuModel } from './core/models/layout/menu.model';
import { TokenService } from './core/services/authService/token.service';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  layoutAsAdmin: boolean = false;
  noSesion: boolean = false;

  treeControl = new FlatTreeControl<FlatMenuItem>(
    node => node.level,
    node => node.expandable,
  );

  private _transformer = (node: MenuModel, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      item: node,
      level: level,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  hasChild = (_: number, node: FlatMenuItem) => node.expandable;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  @ViewChild('drawer', { static: false }) public drawer!: MatDrawer;

  constructor(
    private windowRef: WindowRef,
    private router: Router,
    private tokenService: TokenService,
    private authService: GuardService
  ) {
    this.dataSource.data = this.getMenu();
  }
  ngOnInit(): void {
    this.showPublicLayout();
  }

  onExpandSideBar() {
    console.log('esto trae el rol :');
    console.log(window.sessionStorage.getItem('AuthAuthorities')?.length);
    console.log(window.sessionStorage.getItem('STATE'));
    if (window.sessionStorage.getItem('AuthAuthorities') != null) {
      console.log("si pase el if con rol");
      this.drawer?.open();
    } else {
      console.log("Me fui al else revisar!!!");
      this.drawer?.close();
      this.noSesion = true;
      this.layoutAsAdmin = false;
    }
  }


  getMenu(): MenuModel[] {
    const role = window.sessionStorage.getItem('AuthAuthorities')?.toLowerCase();
    console.log("esto trae el rol::::::::::::::::::::::::: en el menu get");
    console.log(role);
    return [
      {
        name: 'Propietarios',
        icon: 'perm_media',
        children: [
          { name: 'Lista', path: role + '/product' },
          { name: 'Registro', path: role + '/product/create' }
        ],
      },
      {
        name: 'Usuarios',
        icon: 'account_box',
        children: [
          { name: 'Lista', path: role + '/business' },
          { name: 'Registro', path: role + '/business/create' },
        ],
      },
      {
        name: 'Departamento',
        icon: 'local_convenience_store',
        children: [
          { name: 'Lista', path: role + '/branchoffice' },
          { name: 'Registro', path: role + '/branchoffice/create' },
        ],
      },
      {
        name: 'Clasificación',
        icon: 'reorder',
        children: [
          { name: 'Lista', path: '' },
          { name: 'Registro', path: '' },
        ],
      }
      /*{
        name: 'Nuevo documento',
        icon: 'screen_share',
        children: [
          { name: 'Lista', path: role + '/product' },
          { name: 'Registro', path: role + '/product/create' }
        ]

      }*/,
      {
        name: 'Configuración',
        icon: 'settings',
        children: [
          { name: 'Notificaciones', path: '' },
        ],
      },
      {
        name: 'Salir',
        icon: 'exit_to_app'
      },
    ]
  }

  showPublicLayout(): void {
    const on_session = window.sessionStorage.getItem('STATE');
    console.log(window.sessionStorage.getItem('STATE'));
    console.log("Entrando:::::::::::::::::::::::::::::::::::::: esto el APPCOMPONEN");
    console.log(this.authService.isLogginIn());
    if (this.authService.isLogginIn()) {
      this.layoutAsAdmin = true;
      this.noSesion = false;
      this.layoutAsAdmin = true;
    } else {
      this.layoutAsAdmin = false;
      this.noSesion = true
    }
  }
}
