import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { TodoAction } from '../store/todo.actions';
import AddTodo = TodoAction.AddTodo;
import { Select, Store } from '@ngxs/store';
import { CategoryAction } from '../../category/store/category.actions';
import GetCategories = CategoryAction.GetCategories;
import { CategoryState } from '../../category/store/category.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-store',
  templateUrl: './todo-store.component.html',
  styleUrls: ['./todo-store.component.scss'],
})
export class TodoStoreComponent implements OnInit {
  todoForm: FormGroup;
  @Select(CategoryState.categories) categoryList$!: Observable<Category[]>;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private store: Store
  ) {
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
    this.loadingService.show();
    this.store.dispatch(new GetCategories());
    this.loadingService.hide();
  }

  onSubmit(): void {
    this.store
      .dispatch(new AddTodo(this.todoForm.value))
      .subscribe(() => this.router.navigateByUrl('/todo/list'));
  }

  get titleForm() {
    return this.todoForm.controls['title'];
  }

  get bodyForm() {
    return this.todoForm.controls['body'];
  }
}
