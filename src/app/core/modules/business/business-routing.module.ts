import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { UpdateBusinessComponent } from './update-business/update-business.component';


const routes: Routes = [
  {
    path: '',
    component: BusinessComponent
  },
  {
    path: 'create',
    component: CreateBusinessComponent
  },
  {
    path: 'update/:id',
    component: UpdateBusinessComponent
  },
  {
    path: ':idBusiness/menu',
    loadChildren: () => import('../../../core/modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: ':idBusiness/branchoffice',
    loadChildren: () => import('../../../core/modules/branchoffice/branchoffice.module').then(m => m.BranchofficeModule)
  },
  {
    path: ':idBusiness/product',
    loadChildren: () => import('../../../core/modules/product/product.module').then(m => m.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
