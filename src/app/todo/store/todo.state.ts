import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../../models/todo';
import { TodoAction } from './todo.actions';
import { TodoService } from '../todo.service';
import { tap } from 'rxjs/operators';

export class TodoStateModel {
  todos!: Todo[];
  selectedTodo: Todo | undefined;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    selectedTodo: undefined,
  },
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Action(TodoAction.GetTodos)
  getTodos(ctx: StateContext<TodoStateModel>) {
    console.log(ctx.getState().todos);
    return this.todoService.getTodoList().pipe(
      tap((data) => {
        ctx.patchState({ todos: data });
      })
    );
  }

  @Action(TodoAction.GetTodo)
  getTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.GetTodo) {
    return this.todoService.getTodo(action.id).pipe(
      tap((data) => {
        ctx.patchState({ selectedTodo: data });
      })
    );
  }

  @Action(TodoAction.AddTodo)
  addTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.AddTodo) {
    return this.todoService.add(action.todoFormValue).pipe(
      tap((data) => {
        const state = ctx.getState();
        state.todos.push(data);
        ctx.setState(state);
      })
    );
  }

  @Action(TodoAction.UpdateTodo)
  updateTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.UpdateTodo) {
    return this.todoService.update(action.id, action.todoFormValue).pipe(
      tap((data) => {
        const state = ctx.getState();
        const targetIndex = state.todos.findIndex(
          (todo) => todo.id === data.id
        );
        state.todos[targetIndex] = data;
        ctx.setState(state);
      })
    );
  }

  @Action(TodoAction.DeleteTodo)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: TodoAction.DeleteTodo) {
    return this.todoService.delete(action.id).pipe(
      tap((data) => {
        const state = ctx.getState();
        state.todos = state.todos.filter((todo) => {
          return todo.id !== data.id;
        });
        ctx.setState(state);
      })
    );
  }

  @Selector()
  static todos(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static selectedTodos(state: TodoStateModel) {
    return state.selectedTodo;
  }
}
