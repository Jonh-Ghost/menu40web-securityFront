import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchofficeRoutingModule } from './branchoffice-routing.module';
import { BranchofficeComponent } from './branchoffice.component';
import { UpdateBranchofficeComponent } from './update-branchoffice/update-branchoffice.component';
import { CreateBranchofficeComponent } from './create-branchoffice/create-branchoffice.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BranchofficeComponent,
    CreateBranchofficeComponent,
    UpdateBranchofficeComponent,
  ],
  imports: [
    CommonModule,
    BranchofficeRoutingModule,
    SharedModule
  ]
})
export class BranchofficeModule { }
