import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';
import { Category } from '../../models/Category';
import { colorList } from '../../util/color-list';

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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.categoryId = route.snapshot.params['id'];
    this.getCategory();
  }

  ngOnInit(): void {}

  getCategory(): void {
    this.loadingService.show();
    this.http
      .get<Category>('http://localhost:9000/category/' + this.categoryId)
      .pipe(
        tap((category) => console.log('fetched category')),
        catchError(handleError<Category>('getCategory', undefined))
      )
      .subscribe((category) => {
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
    this.loadingService.show();
    this.http
      .post(
        'http://localhost:9000/category/' + this.categoryId + '/update',
        this.categoryForm.value,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log('update todo')),
        catchError(handleError('onSubmit'))
      )
      .subscribe((_) => this.router.navigateByUrl('/category/list'));
  }

  get nameForm() {
    return this.categoryForm.controls['name'];
  }

  get slugForm() {
    return this.categoryForm.controls['slug'];
  }
}
