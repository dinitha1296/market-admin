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

  pageNumber: number = 1;

  totalPages: number = 1;

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
        this.pageNumber = params.page - 1 || 0;
        return this.productService.getProducts(this.searchQuery, this.pageNumber);
      })
    ).subscribe(productsPage => {
      this.totalPages = productsPage.totalPages;
      this.products = productsPage.content;
    });
  }

  onSearchBtnClick(): void {
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
  }

  onPageNumberClick(newPageNumber: number): void {
    const params = {...this.activatedRoute.snapshot.queryParams};
    if (newPageNumber == 1) {
      delete params.page;
    } else {
      params.page = newPageNumber;
    }
    this.router.navigate(['/products'], {queryParams: params});
  }
}