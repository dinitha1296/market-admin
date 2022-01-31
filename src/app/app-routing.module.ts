import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'products', component: ProductComponent},
<<<<<<< HEAD
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
=======
>>>>>>> ce7494ca07523e0824e0e27976799756431dfdda
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
