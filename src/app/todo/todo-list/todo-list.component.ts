import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { LoadingService } from '../../loading/loading.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];

  constructor(
    private loadingService: LoadingService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getTodoList(): void {
    this.loadingService.show();
    this.todoService.getTodoList().subscribe((todoList) => {
      this.todoList = todoList;
      this.loadingService.hide();
    });
  }
}
