import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmHomeComponent } from './core/modules/shared/layout/adm-home/adm-home.component';
import { HomeComponent } from './core/components/home/home.component';
import { NewAccountComponent } from './core/components/new-account/new-account.component';
import { LoginComponent } from './core/components/login/login.component';
import { LandingPageComponent } from './core/modules/shared/components/landing-page/landing-page.component';
import { LoginAdminComponent } from './core/components/login-admin/login-admin.component';
import { Guard as AuthGuard } from './core/components/_auth/guard.service';
import { OwnersComponent } from './core/modules/owners/owners.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: NewAccountComponent
  },

  {
    path: 'business',
    component: LandingPageComponent
  },

  {
    path: 'console/login',
    component: LoginAdminComponent},
  {
    path: 'administrador',
    canActivate:  [AuthGuard],
    data: {
      role: 'Administrador'
    },
    children: [
      {
        path: 'home',
        component: AdmHomeComponent
      },
      {
        path: 'business',
        loadChildren: () => import('./core/modules/business/business.module').then(m => m.BusinessModule)
      },
      {
        path: 'owners',
        loadChildren: () => import('./core/modules/owners/owners.module').then(m => m.OwnersModule)
      },
      { 
        path: 'branchoffice', 
        loadChildren: () => import('./core/modules/branchoffice/branchoffice.module').then(m => m.BranchofficeModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./core/modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./core/modules/menu/menu.module').then(m => m.MenuModule)
      }
     // {
     //   path: 'menuProduct',
     //   loadChildren: () => import('./core/modules/menu-product/menu-product.module').then(m => m.MenuProductModule)
     // }
    ],
  },
  {
    path: 'owner',
    canActivate:  [AuthGuard],
    data: {
      role: 'Owner'
    },
    children: [
      {
        path: 'home',
        component: AdmHomeComponent
      },
      {
        path: 'business',
        loadChildren: () => import('./core/modules/business/business.module').then(m => m.BusinessModule)
      },
      {
        path: 'owners',
        loadChildren: () => import('./core/modules/owners/owners.module').then(m => m.OwnersModule)
      },
      { 
        path: 'branchoffice', 
        loadChildren: () => import('./core/modules/branchoffice/branchoffice.module').then(m => m.BranchofficeModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./core/modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./core/modules/menu/menu.module').then(m => m.MenuModule)
      }
    //  {
    //    path: 'menuProduct',
    //    loadChildren: () => import('./core/modules/menu-product/menu-product.module').then(m => m.MenuProductModule)
    //  }
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
