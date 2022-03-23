import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';
import { Todo } from '../../models/Todo';
import { LoadingService } from '../../loading/loading.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
})
export class TodoEditComponent implements OnInit {
  todoForm!: FormGroup;
  todo: Todo | undefined;
  todoId: number;
  categoryList: Category[] = [];
  stateList = [
    { code: 0, name: 'TODO(着手前)' },
    { code: 1, name: '進行中' },
    { code: 2, name: '完了' },
  ];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.todoId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getTodo();
  }

  getCategoryList(): void {
    this.loadingService.show();
    this.http
      .get<Category[]>('http://localhost:9000/categories')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(handleError<Category[]>('getCategoryList', []))
      )
      .subscribe((categoryList) => {
        this.categoryList = categoryList;
        this.loadingService.hide();
      });
  }

  getTodo(): void {
    this.loadingService.show();
    this.http
      .get<Todo>('http://localhost:9000/todos/' + this.todoId)
      .pipe(
        tap((todo) => console.log('fetched todo')),
        catchError(handleError<Todo>('getTodo', undefined))
      )
      .subscribe((todo) => {
        this.todo = todo;
        this.setForm();
        this.loadingService.hide();
      });
  }

  setForm(): void {
    const targetCategory = this.categoryList.find(
      (c) => c.name == this.todo?.categoryStr
    );
    const targetState = this.stateList.find(
      (s) => s.name == this.todo?.stateStr
    );
    this.todoForm = new FormGroup({
      title: new FormControl(this.todo?.title, Validators.required),
      body: new FormControl(this.todo?.body, Validators.required),
      categoryId: new FormControl(
        targetCategory !== undefined ? targetCategory.id : 0,
        Validators.required
      ),
      state: new FormControl(
        targetState !== undefined ? targetState.code : -1,
        Validators.required
      ),
    });
  }

  onSubmit(): void {
    this.loadingService.show();
    this.http
      .put(
        'http://localhost:9000/todos/' + this.todoId,
        this.todoForm.value,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log('update todo')),
        catchError(handleError('onSubmit'))
      )
      .subscribe((_) => this.router.navigateByUrl('/todo/list'));
  }

  get titleForm() {
    return this.todoForm.controls['title'];
  }

  get bodyForm() {
    return this.todoForm.controls['body'];
  }
}
