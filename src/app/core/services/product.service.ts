import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL: string = "api/products";

  private readonly _producList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  public readonly productList: Observable<Product[]> = this._producList.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> { 
    return this.http.get<Product[]>(
        this.baseURL,
        {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProductById(id: number): Observable<Product> { 
    return this.http.get<Product>(
        `${this.baseURL}/${encodeURIComponent(id)}`
      ).pipe(
        catchError(this.handleError<Product>('getProducts', undefined))
      );
  }

  handleError<T>(operation: String, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`Error Status: ${error.status}`);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
