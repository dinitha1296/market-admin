import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './page/products/products.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { RupeeModule } from '../ui/pipes/rupee/rupee.module';
import { UnitModule } from '../ui/pipes/unit/unit.module';
import { AllowNumbersModule } from '../ui/directives/allow-numbers/allow-numbers.module';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { ProductCardContainerComponent } from './component/product-card-container/product-card-container.component';
import { ProductViewerComponent } from './component/product-viewer/product-viewer.component';
import { ProductDetailsComponent } from './page/product-details/product-details.component';
import { ProductEditorComponent } from './component/product-editor/product-editor.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    SearchBarComponent,
    ProductCardContainerComponent,
    ProductViewerComponent,
    ProductDetailsComponent,
    ProductEditorComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    RupeeModule,
    UnitModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDividerModule,
    AllowNumbersModule
  ]
})
export class ProductsModule { }
