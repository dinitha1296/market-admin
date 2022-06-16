import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { Product } from '../models/product.model';

import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL: string = "api/products";

  private readonly _producList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  public readonly productList: Observable<Product[]> = this._producList.asObservable();

  constructor(private http: HttpClient) {
  }
  
  /** 
   * GET all products
   * 
   * @param query - search query
   * @param pageNumber - page number of the page being requested
   * @param pageSize - number of results per page
   */
  getProducts(query?: string, pageNumber?: number, pageSize?: number): Observable<Page<Product>> {

    const params: any = {};

    if (query) params.query = query;
    if (pageNumber) params["page-number"] = pageNumber;
    if (pageSize) params["page-size"] = pageSize

    return this.http.get<Page<Product>>(
      this.baseURL,
      { params }
    ).pipe(
      catchError(this.handleError<Page<Product>>('getProductsByQuery', undefined))
    );
  }

  /**
   * GET product by product ID
   * 
   * @param id - id of the product
   */
  getProductById(id: number): Observable<Product> { 
    return this.http.get<Product>(
        `${this.baseURL}/${encodeURIComponent(id)}`
      ).pipe(
        catchError(this.handleError<Product>('getProduct', undefined))
      );
  }

  private handleError<T>(operation: String, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`Error Status: ${error.status}`);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
