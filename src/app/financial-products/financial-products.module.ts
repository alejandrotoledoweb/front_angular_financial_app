import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';


@NgModule({
  declarations: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    FinancialProductsRoutingModule
  ]
})
export class FinancialProductsModule { }
