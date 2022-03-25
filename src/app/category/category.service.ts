import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../util/handle-error';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:9000/categories';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl).pipe(
      tap(() => console.log('fetched categories')),
      catchError(handleError<Category[]>('getCategoryList', []))
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log('fetched category')),
      catchError(handleError<Category>('getCategory'))
    );
  }

  add(categoryFormValue: any): Observable<any> {
    return this.http
      .post(this.baseUrl, categoryFormValue, this.httpOptions)
      .pipe(
        tap(() => console.log('add category')),
        catchError(handleError('addCategory'))
      );
  }

  update(id: number, categoryFormValue: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${id}`, categoryFormValue, this.httpOptions)
      .pipe(
        tap(() => console.log('update category')),
        catchError(handleError('updateCategory'))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log('delete category')),
      catchError(handleError('delete'))
    );
  }
}
