import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoStoreComponent } from './todo-store/todo-store.component';
import { ColorPipe } from '../util/color.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoEditComponent,
    TodoStoreComponent,
    ColorPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoModule {}
