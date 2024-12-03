import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from '../../../core/modules/menu/menu.module';
import { BranchofficeComponent } from './branchoffice.component';
import { CreateBranchofficeComponent } from './create-branchoffice/create-branchoffice.component';
import { UpdateBranchofficeComponent } from './update-branchoffice/update-branchoffice.component';

const routes: Routes = [
  {
    path: '',
    component: BranchofficeComponent 
  },
  {
    path: 'create',
    component: CreateBranchofficeComponent
  },
  {
    path: 'update/:id',
    component: UpdateBranchofficeComponent
  },
  {
    path: ':idBranchOffice/menu',
    loadChildren: () => import ('../../../core/modules/menu/menu.module').then(m => MenuModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchofficeRoutingModule { }
