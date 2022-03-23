import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { Todo } from '../../models/Todo';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { handleError } from '../../util/handle-error';
import { LoadingService } from '../../loading/loading.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Output() event = new EventEmitter<String>();
  categoryColor: string = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef
  ) {
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
    this.http
      .post(
        'http://localhost:9000/todo/delete',
        { id: this.todo?.id },
        this.httpOptions
      )
      .pipe(
        tap(() => console.log('delete todo')),
        catchError(handleError('delete'))
      )
      .subscribe((_) => this.event.emit());
  }
}
