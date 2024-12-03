import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuProductRoutingModule } from './menu-product-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MenuProductComponent } from './menuProduct.component';

@NgModule({
  declarations: [
    MenuProductComponent
  ],
  imports: [
    CommonModule,
    MenuProductRoutingModule,
    DragDropModule
  ]
})
export class MenuProductModule { }
