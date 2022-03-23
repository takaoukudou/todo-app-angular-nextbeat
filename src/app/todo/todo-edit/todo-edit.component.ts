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
  todoForm: FormGroup;
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
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
    this.todoId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.loadingService.show();
    this.http
      .get<Category[]>('http://localhost:9000/category/list')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(handleError<Category[]>('getCategoryList', []))
      )
      .subscribe((categoryList) => {
        this.categoryList = categoryList;
        this.loadingService.hide();
      });
  }

  onSubmit(): void {
    this.loadingService.show();
    this.http
      .post(
        'http://localhost:9000/todo/' + this.todoId + '/update',
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
