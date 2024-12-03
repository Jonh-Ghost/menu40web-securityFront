import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { UpdateBusinessComponent } from './update-business/update-business.component';
import { SharedModule } from '../shared/shared.module';
import { FormBusinessComponent } from '../shared/components/business/form-business/form-business.component';


@NgModule({
  declarations: [
    BusinessComponent,
    CreateBusinessComponent,
    UpdateBusinessComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule
  ]
})
export class BusinessModule { }
