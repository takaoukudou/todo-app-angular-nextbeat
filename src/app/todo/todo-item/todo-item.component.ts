import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TodoAction } from '../store/todo.actions';
import DeleteTodo = TodoAction.DeleteTodo;

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Output() event = new EventEmitter<String>();
  categoryColor: string = '';

  constructor(private router: Router, private store: Store) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.categoryColor =
      this.todo?.color === 1
        ? 'category-red'
        : this.todo?.color === 2
        ? 'category-blue'
        : this.todo?.color === 3
        ? 'category-green'
        : this.todo?.color === 4
        ? 'category-yellow'
        : this.todo?.color === 5
        ? 'category-pink'
        : 'category-undefined';
  }

  edit(id: number) {
    this.router.navigateByUrl(`todo/${id}/edit`);
  }

  delete(id: number) {
    this.store.dispatch(new DeleteTodo(id)).subscribe(() => this.event.emit());
  }
}
