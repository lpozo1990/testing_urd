import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopModule } from '../shop/shop.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ShopModule,
    SharedModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
],
})
export class CoreModule { }
