import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { AccountBankComponent } from './account-bank/account-bank.component';

const routes: Routes = [
  { path: '',
    // canActivate: [ VerifyTokenGuard ],
    component: AccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'inventario',
        component: InventoryComponent
      },
      {
        path: 'mis-ordenes',
        component: SalesHistoryComponent
      },
      {
        path: 'account-bank',
        component: AccountBankComponent
      },
      {
        path: 'historial-rentas',
        component: SalesOrdersComponent
      },
      {
        path: 'favoritos',
        component: FavoritesComponent
      },
      {
        path: 'nuevo-producto',
        component: ProductComponent
      },
      {
        path: 'editar-producto/:product',
        component: EditProductComponent
      },
      {
        path: 'ver-orden/:order',
        component: ViewOrderComponent
      },
      {
        path: 'mi-orden/:order',
        component: ViewHistoryComponent
      },
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
