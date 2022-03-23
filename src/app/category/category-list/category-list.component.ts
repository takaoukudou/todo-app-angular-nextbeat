import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getCategoryList(): void {
    this.loadingService.show();
    this.http
      .get<Category[]>('http://localhost:9000/category/list')
      .pipe(
        tap((todos) => console.log('fetched todos')),
        catchError(handleError<Category[]>('getCategoryList', []))
      )
      .subscribe((categoryList) => {
        this.categoryList = categoryList;
        this.loadingService.hide();
      });
  }
}
