import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo';
import { LoadingService } from '../../loading/loading.service';
import { Select, Store } from '@ngxs/store';
import { TodoState } from '../store/todo.state';
import { Observable } from 'rxjs';
import { TodoAction } from '../store/todo.actions';
import GetTodo = TodoAction.GetTodo;
import UpdateTodo = TodoAction.UpdateTodo;
import { CategoryAction } from '../../category/store/category.actions';
import GetCategories = CategoryAction.GetCategories;
import { CategoryState } from '../../category/store/category.state';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
})
export class TodoEditComponent implements OnInit {
  todoForm!: FormGroup;
  @Select(TodoState.selectedTodos) todo$!: Observable<Todo>;
  todoId: number;
  @Select(CategoryState.categories) categoryList$!: Observable<Category[]>;
  stateList = [
    { code: 0, name: 'TODO(着手前)' },
    { code: 1, name: '進行中' },
    { code: 2, name: '完了' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private store: Store
  ) {
    this.todoId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getTodo();
  }

  getCategoryList(): void {
    this.loadingService.show();
    this.store.dispatch(new GetCategories());
    this.loadingService.hide();
  }

  getTodo(): void {
    this.loadingService.show();
    this.store.dispatch(new GetTodo(this.todoId)).subscribe(() => {
      this.setForm();
      this.loadingService.hide();
    });
  }

  setForm(): void {
    this.todo$.subscribe((todo) => {
      this.categoryList$.subscribe((categoryList) => {
        const targetCategory = categoryList.find(
          (c) => c.name == todo.categoryStr
        );
        const targetState = this.stateList.find((s) => s.name == todo.stateStr);
        this.todoForm = new FormGroup({
          title: new FormControl(todo.title, Validators.required),
          body: new FormControl(todo.body, Validators.required),
          categoryId: new FormControl(
            targetCategory !== undefined ? targetCategory.id : 0,
            Validators.required
          ),
          state: new FormControl(
            targetState !== undefined ? targetState.code : -1,
            Validators.required
          ),
        });
      });
    });
  }

  onSubmit(): void {
    this.store
      .dispatch(new UpdateTodo(this.todoId, this.todoForm.value))
      .subscribe(() => this.router.navigateByUrl('/todo/list'));
  }

  get titleForm() {
    return this.todoForm.controls['title'];
  }

  get bodyForm() {
    return this.todoForm.controls['body'];
  }
}
