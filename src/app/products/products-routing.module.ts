import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './page/product-details/product-details.component';
import { ProductsComponent } from './page/products/products.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductDetailsComponent
  },
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
