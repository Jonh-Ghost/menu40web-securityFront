import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdmFooterComponent } from './layout/adm-footer/adm-footer.component';
import { AdmHeaderComponent } from './layout/adm-header/adm-header.component';
import { AdmHomeComponent } from './layout/adm-home/adm-home.component';
import { FormBusinessComponent } from './components/business/form-business/form-business.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormProductFilterComponent } from './components/product/form-product-filter/form-product-filter.component';
import { FormMenuFilterComponent } from './components/menu/form-menu-filter/form-menu-filter.component';
import { FormBranchofficeComponent } from '../branchoffice/form-branchoffice/form-branchoffice/form-branchoffice.component';
import { FormBranchofficeFilterComponent } from './components/branchoffice/form-branchoffice-filter/form-branchoffice-filter.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdmFooterComponent,
    AdmHeaderComponent,
    AdmHomeComponent,
    FormBusinessComponent,
    SignUpComponent,
    SignInComponent,
    LandingPageComponent,    
    FormBranchofficeComponent, FormProductFilterComponent, FormBranchofficeFilterComponent, FormMenuFilterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AdmFooterComponent,
    AdmHeaderComponent,
    AdmHomeComponent,
    FormBusinessComponent,
    SignUpComponent,
    SignInComponent,
    FormProductFilterComponent,
    FormBranchofficeFilterComponent,
    FormBranchofficeComponent,
    HttpClientModule,
    ReactiveFormsModule,
    LandingPageComponent,
    MaterialModule,
    FormMenuFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }