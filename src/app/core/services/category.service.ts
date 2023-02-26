import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _baseURL: string = "api/categories";

  constructor(private http: HttpClient) { }

  /** 
   * GET all products
   */
  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this._baseURL)
      .pipe(
        catchError(this._handleError<Category[]>('getCategories', undefined))
      );
  }

  private _handleError<T>(operation: String, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`Error Status: ${error.status}`);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
