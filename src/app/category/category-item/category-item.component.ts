import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from '../../models/Category';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../util/handle-error';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category | undefined;
  @Output() event = new EventEmitter<String>();
  categoryColor: string = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef
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
    this.http
      .post(
        'http://localhost:9000/category/delete',
        { id: this.category?.id },
        this.httpOptions
      )
      .pipe(
        tap(() => console.log('delete todo')),
        catchError(handleError('delete'))
      )
      .subscribe((_) => this.event.emit());
  }
}
