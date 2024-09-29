import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './financial-products/products-list/products-list.component';
import { AddProductComponent } from './financial-products/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'add-product', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
