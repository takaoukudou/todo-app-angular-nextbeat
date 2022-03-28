import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryAction } from '../store/category.actions';
import DeleteCategory = CategoryAction.DeleteCategory;
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category | undefined;
  @Output() event = new EventEmitter<String>();
  categoryColor: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.categoryColor =
      this.category?.color === 1
        ? 'category-red'
        : this.category?.color === 2
        ? 'category-blue'
        : this.category?.color === 3
        ? 'category-green'
        : this.category?.color === 4
        ? 'category-yellow'
        : 'category-pink';
  }

  edit(id: number) {
    this.router.navigateByUrl(`category/${id}/edit`);
  }

  delete(id: number) {
    this.store
      .dispatch(new DeleteCategory(id))
      .subscribe((_) => this.event.emit());
  }
}
