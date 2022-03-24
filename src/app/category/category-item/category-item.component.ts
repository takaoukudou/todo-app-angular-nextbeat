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
import { Category } from '../../models/Category';
import { CategoryService } from '../category.service';

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
    private categoryService: CategoryService
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
    this.categoryService.delete(id).subscribe((_) => this.event.emit());
  }
}
