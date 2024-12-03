import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { SharedModule } from '../shared/shared.module';
import { FormMenuComponent } from './form-menu/form-menu.component';



@NgModule({
  declarations: [
    MenuComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    FormMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
