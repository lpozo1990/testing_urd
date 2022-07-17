import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './shop/home/home.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home/one',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home/one'
  }
];

