import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseURL: string = "api/departments"

  constructor(
    private http: HttpClient
  ) { }

  /**
   * GET all departments
   */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(
      this.baseURL,
      {
        observe: 'body',
        responseType: 'json'
      }
    ).pipe(
      catchError(this.handleError<Department[]>('getDepartment', undefined))
    )
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
