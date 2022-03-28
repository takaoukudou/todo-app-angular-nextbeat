import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../util/handle-error';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditTodoFormValue, StoreTodoFormValue } from '../models/todo-form';
import { OnlyId } from '../models/onlyId';

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

  add(todoFormValue: StoreTodoFormValue): Observable<Todo> {
    return this.http
      .post<Todo>(this.baseUrl, todoFormValue, this.httpOptions)
      .pipe(
        tap((todo) => console.log('add todo')),
        catchError(handleError<Todo>('addTodo'))
      );
  }

  update(id: number, todoFormValue: EditTodoFormValue): Observable<Todo> {
    return this.http
      .put<Todo>(`${this.baseUrl}/${id}`, todoFormValue, this.httpOptions)
      .pipe(
        tap(() => console.log('update todo')),
        catchError(handleError<Todo>('updateTodo'))
      );
  }

  delete(id: number): Observable<OnlyId> {
    return this.http.delete<OnlyId>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log('delete todo')),
      catchError(handleError<OnlyId>('delete'))
    );
  }
}
