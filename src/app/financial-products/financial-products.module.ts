import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsListComponent, AddProductComponent],
  imports: [
    CommonModule,
    FinancialProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FinancialProductsModule {}
