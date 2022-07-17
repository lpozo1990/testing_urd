import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { NgModule } from '@angular/core';

const rootRouterConfig: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

