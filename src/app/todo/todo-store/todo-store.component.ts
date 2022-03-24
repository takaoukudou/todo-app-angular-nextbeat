import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { CategoryService } from '../../category/category.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-store',
  templateUrl: './todo-store.component.html',
  styleUrls: ['./todo-store.component.scss'],
})
export class TodoStoreComponent implements OnInit {
  todoForm: FormGroup;
  categoryList: Category[] = [];

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private todoService: TodoService
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
    this.categoryService.getCategoryList().subscribe((categoryList) => {
      this.categoryList = categoryList;
      this.loadingService.hide();
    });
  }

  onSubmit(): void {
    this.todoService
      .add(this.todoForm.value)
      .subscribe((_) => this.router.navigateByUrl('/todo/list'));
  }

  get titleForm() {
    return this.todoForm.controls['title'];
  }

  get bodyForm() {
    return this.todoForm.controls['body'];
  }
}
