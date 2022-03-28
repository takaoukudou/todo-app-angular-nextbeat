import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { colorList } from '../../util/color-list';
import { Store } from '@ngxs/store';
import { CategoryAction } from '../store/category.actions';
import AddCategory = CategoryAction.AddCategory;

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss'],
})
export class CategoryStoreComponent implements OnInit {
  categoryForm: FormGroup;
  colorList = colorList;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      slug: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      color: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.store
      .dispatch(new AddCategory(this.categoryForm.value))
      .subscribe((_) => this.router.navigateByUrl('/category/list'));
  }

  get nameForm() {
    return this.categoryForm.controls['name'];
  }

  get slugForm() {
    return this.categoryForm.controls['slug'];
  }
}
