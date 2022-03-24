import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { Category } from '../../models/Category';
import { colorList } from '../../util/color-list';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId: number;
  category: Category | undefined;
  colorList = colorList;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private categoryService: CategoryService
  ) {
    this.categoryId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.loadingService.show();
    this.categoryService.getCategory(this.categoryId).subscribe((category) => {
      this.category = category;
      this.setForm();
      this.loadingService.hide();
    });
  }

  setForm(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category?.name, Validators.required),
      slug: new FormControl(this.category?.slug, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      color: new FormControl(this.category?.color, Validators.required),
    });
  }

  onSubmit(): void {
    this.categoryService
      .update(this.categoryId, this.categoryForm.value)
      .subscribe((_) => this.router.navigateByUrl('/category/list'));
  }

  get nameForm() {
    return this.categoryForm.controls['name'];
  }

  get slugForm() {
    return this.categoryForm.controls['slug'];
  }
}
