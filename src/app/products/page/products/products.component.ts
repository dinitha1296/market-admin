import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pageNumber: number = 0;

  totalElements: number = 0;

  pageSize: BehaviorSubject<number> = new BehaviorSubject(20);

  pageSizeOptions: number[] = [20, 30, 40, 50]

  searchControl: FormControl = new FormControl('');

  searchQuery: string = '';

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    /* Setting inital value of search input to url paramaters */
    
    this.searchControl.setValue(this.activatedRoute.snapshot.queryParams.search || '');

    this.activatedRoute.queryParams
      .pipe(
        mergeMap(params => {
          return this.pageSize.asObservable().pipe(map(totalPages => {
            return { params, totalPages }
          }))
        })
      )
      .pipe(
        mergeMap(reqParams => {
          this.pageNumber = reqParams.params.page - 1 || 0;
          this.searchQuery = reqParams.params.search || '';
          return this.productService.getProducts(this.searchQuery, this.pageNumber, reqParams.totalPages);
        })
      )
      .subscribe(page => {
        this.totalElements = page.totalElements;
        this.products = page.content;
      });
  }

  changePage(pageEvent: PageEvent): void {
    if (pageEvent.pageSize !== this.pageSize.getValue()) {
      this.pageSize.next(pageEvent.pageSize)
    }
    if (pageEvent.pageIndex !== this.pageNumber) {
      const params = { ...this.activatedRoute.snapshot.queryParams };
      if (pageEvent.pageIndex == 0) {
        delete params.page;
      } else {
        params.page = pageEvent.pageIndex + 1;
      }
      this.router.navigate(['/products'], { queryParams: params });
    }
  }

  submitSearch() {
    this.router.navigate(['/products'], { queryParams: { search: this.searchControl.value } });
  }

}
