import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { colorList } from '../../util/color-list';
import { CategoryService } from '../category.service';

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
    private categoryService: CategoryService
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
    this.categoryService
      .add(this.categoryForm.value)
      .subscribe((_) => this.router.navigateByUrl('/category/list'));
  }

  get nameForm() {
    return this.categoryForm.controls['name'];
  }

  get slugForm() {
    return this.categoryForm.controls['slug'];
  }
}
