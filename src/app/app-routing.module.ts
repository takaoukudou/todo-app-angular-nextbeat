import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TodoListComponent} from "./todo/todo-list/todo-list.component";
import {TodoEditComponent} from "./todo/todo-edit/todo-edit.component";
import {TodoStoreComponent} from "./todo/todo-store/todo-store.component";
import {CategoryListComponent} from "./category/category-list/category-list.component";
import {CategoryEditComponent} from "./category/category-edit/category-edit.component";
import {CategoryStoreComponent} from "./category/category-store/category-store.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"todo/list",component:TodoListComponent},
  {path:"todo/:id/edit",component:TodoEditComponent},
  {path:"todo/store",component:TodoStoreComponent},
  {path:"category/list",component:CategoryListComponent},
  {path:"category/:id/edit",component:CategoryEditComponent},
  {path:"category/store",component:CategoryStoreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
