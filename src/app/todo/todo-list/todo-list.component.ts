import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';

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

  refresh(): void {
    this.ngOnInit();
  }

  getTodoList(): void {
    this.http
      .get<Todo[]>('http://localhost:9000/todo/list')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(handleError<Todo[]>('getTodoList', []))
      )
      .subscribe((todoList) => (this.todoList = todoList));
  }
}
