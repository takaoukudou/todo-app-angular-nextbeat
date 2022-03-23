import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';
import { LoadingService } from '../../loading/loading.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getTodoList(): void {
    this.loadingService.show();
    this.http
      .get<Todo[]>('http://localhost:9000/todos')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(handleError<Todo[]>('getTodoList', []))
      )
      .subscribe((todoList) => {
        this.todoList = todoList;
        this.loadingService.hide();
      });
  }
}
