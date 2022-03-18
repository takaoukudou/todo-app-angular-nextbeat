import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryStoreComponent } from './category-store/category-store.component';

@NgModule({
  declarations: [
    CategoryEditComponent,
    CategoryListComponent,
    CategoryItemComponent,
    CategoryStoreComponent,
  ],
  imports: [CommonModule],
})
export class CategoryModule {}
