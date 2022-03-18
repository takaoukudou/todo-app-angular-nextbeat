import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    this.http
      .get<Todo[]>('http://localhost:9000/todo/list')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodoList', []))
      )
      .subscribe((todoList) => (this.todoList = todoList));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
