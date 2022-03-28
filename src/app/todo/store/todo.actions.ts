import { EditTodoFormValue, StoreTodoFormValue } from '../../models/todo-form';

export namespace TodoAction {
  export class GetTodos {
    static readonly type = '[Todo] GetTodos';
  }

  export class GetTodo {
    static readonly type = '[Todo] Get';

    constructor(public id: number) {}
  }

  export class AddTodo {
    static readonly type = '[Todo] Add';

    constructor(public todoFormValue: StoreTodoFormValue) {}
  }

  export class UpdateTodo {
    static readonly type = '[Todo] Update';

    constructor(public id: number, public todoFormValue: EditTodoFormValue) {}
  }

  export class DeleteTodo {
    static readonly type = '[Todo] Delete';

    constructor(public id: number) {}
  }
}
