import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MenuProductComponent } from './menuProduct.component';

const routes: Routes = [
  {
    path: '',
    component: MenuProductComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenuProductRoutingModule { }
