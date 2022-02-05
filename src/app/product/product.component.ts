import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  productId: string = "";

  product?: Product = undefined;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    if (!this.productId || !this.productId.match(/^\d*$/)) return;
    this.productService.getProductById(Number.parseInt(this.productId))
      .subscribe(prod => {
        this.product = prod;
        console.log(prod)
      });
    // this.productService.getProducts().subscribe(p => console.log(p));
  }
}
