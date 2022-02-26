import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  searchQuery: string = "";

  products?: Product[] = undefined;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProductsByQuery(this.searchQuery)
      .subscribe(prods => {
        this.products = prods;
        console.log(prods)
      });
  }

  onSearchBtnClick(): void {
    this.productService.getProductsByQuery(this.searchQuery)
      .subscribe(prods => {
        this.products = prods;
        console.log(prods)
      });
    // this.productService.getProducts().subscribe(p => console.log(p));
  }
}
