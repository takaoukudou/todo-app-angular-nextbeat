import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../util/handle-error';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:9000/todos';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl).pipe(
      tap(() => console.log('fetched todos')),
      catchError(handleError<Todo[]>('getTodoList', []))
    );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log('fetched todo')),
      catchError(handleError<Todo>('getTodo'))
    );
  }

  add(todoFormValue: any): Observable<any> {
    return this.http.post(this.baseUrl, todoFormValue, this.httpOptions).pipe(
      tap(() => console.log('add todo')),
      catchError(handleError('addTodo'))
    );
  }

  update(id: number, todoFormValue: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${id}`, todoFormValue, this.httpOptions)
      .pipe(
        tap(() => console.log('update todo')),
        catchError(handleError('updateTodo'))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log('delete todo')),
      catchError(handleError('delete'))
    );
  }
}
