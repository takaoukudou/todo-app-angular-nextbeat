import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { Category } from '../../models/category';
import { colorList } from '../../util/color-list';
import { Select, Store } from '@ngxs/store';
import { CategoryState } from '../store/category.state';
import { Observable } from 'rxjs';
import { CategoryAction } from '../store/category.actions';
import UpdateCategory = CategoryAction.UpdateCategory;
import GetCategory = CategoryAction.GetCategory;

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId: number;
  @Select(CategoryState.selectedCategory) category$!: Observable<Category>;
  colorList = colorList;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private store: Store
  ) {
    this.categoryId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.loadingService.show();
    this.store
      .dispatch(new GetCategory(this.categoryId))
      .subscribe(() => this.setForm());
    this.loadingService.hide();
  }

  setForm(): void {
    this.category$.subscribe((category) => {
      this.categoryForm = new FormGroup({
        name: new FormControl(category?.name, Validators.required),
        slug: new FormControl(category?.slug, [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
        ]),
        color: new FormControl(category?.color, Validators.required),
      });
    });
  }

  onSubmit(): void {
    this.store
      .dispatch(new UpdateCategory(this.categoryId, this.categoryForm.value))
      .subscribe(() => this.router.navigateByUrl('/category/list'));
  }

  get nameForm() {
    return this.categoryForm.controls['name'];
  }

  get slugForm() {
    return this.categoryForm.controls['slug'];
  }
}
