import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners.component';
import { CreateOwnerComponent } from './create-owner/create-owner.component';
import { UpdateOwnerComponent } from './update-owner/update-owner.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    OwnersComponent,
    CreateOwnerComponent,
    UpdateOwnerComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class OwnersModule { }
