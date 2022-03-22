import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { handleError } from '../../util/handle-error';

@Component({
  selector: 'app-todo-store',
  templateUrl: './todo-store.component.html',
  styleUrls: ['./todo-store.component.scss'],
})
export class TodoStoreComponent implements OnInit {
  todoForm: FormGroup;
  categoryList: Category[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.http
      .get<Category[]>('http://localhost:9000/category/list')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(handleError<Category[]>('getCategoryList', []))
      )
      .subscribe((categoryList) => (this.categoryList = categoryList));
  }

  onSubmit(): void {
    this.http
      .post(
        'http://localhost:9000/todo/store',
        this.todoForm.value,
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(res)),
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
