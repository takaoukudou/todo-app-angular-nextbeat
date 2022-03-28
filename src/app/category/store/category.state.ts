import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Category } from '../../models/category';
import { CategoryAction } from './category.actions';
import { CategoryService } from '../category.service';
import { tap } from 'rxjs/operators';

export class CategoryStateModel {
  categories!: Category[];
  selectedCategory: Category | undefined;
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    selectedCategory: undefined,
  },
})
@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService) {}

  @Action(CategoryAction.GetCategories)
  getCategories(ctx: StateContext<CategoryStateModel>) {
    return this.categoryService.getCategoryList().pipe(
      tap((data) => {
        ctx.patchState({ categories: data });
      })
    );
  }

  @Action(CategoryAction.GetCategory)
  getCategory(
    ctx: StateContext<CategoryStateModel>,
    action: CategoryAction.GetCategory
  ) {
    return this.categoryService.getCategory(action.id).pipe(
      tap((data) => {
        ctx.patchState({ selectedCategory: data });
      })
    );
  }

  @Action(CategoryAction.AddCategory)
  addCategory(
    ctx: StateContext<CategoryStateModel>,
    action: CategoryAction.AddCategory
  ) {
    return this.categoryService.add(action.categoryFormValue).pipe(
      tap((data) => {
        const state = ctx.getState();
        state.categories.push(data);
        ctx.setState(state);
      })
    );
  }

  @Action(CategoryAction.UpdateCategory)
  updateCategory(
    ctx: StateContext<CategoryStateModel>,
    action: CategoryAction.UpdateCategory
  ) {
    return this.categoryService
      .update(action.id, action.categoryFormValue)
      .pipe(
        tap((data) => {
          const state = ctx.getState();
          const targetIndex = state.categories.findIndex(
            (todo) => todo.id === data.id
          );
          state.categories[targetIndex] = data;
          ctx.setState(state);
        })
      );
  }

  @Action(CategoryAction.DeleteCategory)
  deleteCategory(
    ctx: StateContext<CategoryStateModel>,
    action: CategoryAction.DeleteCategory
  ) {
    return this.categoryService.delete(action.id).pipe(
      tap((data) => {
        const state = ctx.getState();
        state.categories = state.categories.filter((todo) => {
          return todo.id !== data.id;
        });
        ctx.setState(state);
      })
    );
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static selectedCategory(state: CategoryStateModel) {
    return state.selectedCategory;
  }
}
