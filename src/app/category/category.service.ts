import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../util/handle-error';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:9000/categories';

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl).pipe(
      tap(() => console.log('fetched categories')),
      catchError(handleError<Category[]>('getCategoryList', []))
    );
  }
}
