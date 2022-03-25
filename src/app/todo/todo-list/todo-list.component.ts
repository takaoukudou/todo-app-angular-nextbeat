import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { LoadingService } from '../../loading/loading.service';
import { TodoService } from '../todo.service';
import { Select, Store } from '@ngxs/store';
import { TodoState } from '../store/todo.state';
import { Observable } from 'rxjs';
import { TodoAction } from '../store/todo.actions';
import GetTodos = TodoAction.GetTodos;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.todos) todoList$!: Observable<Todo[]>;

  constructor(
    private loadingService: LoadingService,
    private todoService: TodoService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getTodoList(): void {
    this.loadingService.show();
    this.store.dispatch(new GetTodos());
    this.loadingService.hide();
  }
}
