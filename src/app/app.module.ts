import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNavigatorComponent } from './page-navigator/page-navigator.component';
import { ProductsComponent } from './products/products.component';
import { CurrencyPipe } from './pipes/currency/currency.pipe';
import { ProductItemComponent } from './product-item/product-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LayoutModule } from './layout/layout.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNavigatorComponent,
    ProductsComponent,
    CurrencyPipe,
    ProductItemComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
