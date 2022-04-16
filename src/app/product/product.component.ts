import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
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
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      mergeMap(params => {
        this.searchQuery = params.search || "";
        return this.productService.getProductsByQuery(this.searchQuery)
      })
    ).subscribe(products => this.products = products);
  }

  onSearchBtnClick(): void {
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery} });
  }
}