import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { MenuProductModule } from '../../../core/modules/shared/components/menu-product/menu-product.module';

const routes: Routes = [
  { path: '',
    component: MenuComponent
  },
  {
    path:'create',
    component: CreateMenuComponent
  },
  {
    path:'update/:id',
    component:UpdateMenuComponent
  },
  {
    path: ':idMenu/:typeMenu.id/menuProduct',
    loadChildren: () => import ('../../../core/modules/shared/components/menu-product/menu-product.module').then(m => MenuProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
