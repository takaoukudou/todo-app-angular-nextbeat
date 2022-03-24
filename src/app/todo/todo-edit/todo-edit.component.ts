import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/Todo';
import { LoadingService } from '../../loading/loading.service';
import { CategoryService } from '../../category/category.service';
import { TodoService } from '../todo.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private todoService: TodoService
  ) {
    this.todoId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getTodo();
  }

  getCategoryList(): void {
    this.loadingService.show();
    this.categoryService.getCategoryList().subscribe((categoryList) => {
      this.categoryList = categoryList;
      this.loadingService.hide();
    });
  }

  getTodo(): void {
    this.loadingService.show();
    this.todoService.getTodo(this.todoId).subscribe((todo) => {
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
    this.todoService
      .update(this.todoId, this.todoForm.value)
      .subscribe((_) => this.router.navigateByUrl('/todo/list'));
  }

  get titleForm() {
    return this.todoForm.controls['title'];
  }

  get bodyForm() {
    return this.todoForm.controls['body'];
  }
}
