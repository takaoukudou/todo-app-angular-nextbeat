import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';
import { colorList } from '../../util/color-list';

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss'],
})
export class CategoryStoreComponent implements OnInit {
  categoryForm: FormGroup;
  colorList = colorList;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {
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
    this.http
      .post(
        'http://localhost:9000/category/store',
        this.categoryForm.value,
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(res)),
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
