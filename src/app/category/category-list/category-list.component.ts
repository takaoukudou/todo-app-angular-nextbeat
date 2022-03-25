import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';
import { CategoryState } from '../store/category.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CategoryAction } from '../store/category.actions';
import GetCategories = CategoryAction.GetCategories;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @Select(CategoryState.categories) categoryList$!: Observable<Category[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getCategoryList(): void {
    this.loadingService.show();
    this.store.dispatch(new GetCategories());
    this.loadingService.hide();
  }
}
