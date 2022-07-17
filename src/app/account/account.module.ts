import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductComponent } from './product/product.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ShopModule } from '../shop/shop.module';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { AccountBankComponent } from './account-bank/account-bank.component';

@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    SidebarComponent,
    InventoryComponent,
    SalesHistoryComponent,
    AccountBankComponent,
    SalesOrdersComponent,
    FavoritesComponent,
    ViewOrderComponent,
    ViewHistoryComponent,
    ProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6GCuZNzRRX4A9g8NHlWpS2GQGfHkoGTo',
      // libraries: ['places']
    }),
    ShopModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
})
export class AccountModule { }
