import { CategoryFormValue } from '../../models/category-form';

export namespace CategoryAction {
  export class GetCategories {
    static readonly type = '[Category] GetCategories';
  }

  export class GetCategory {
    static readonly type = '[Category] Get';

    constructor(public id: number) {}
  }

  export class AddCategory {
    static readonly type = '[Category] Add';

    constructor(public categoryFormValue: CategoryFormValue) {}
  }

  export class UpdateCategory {
    static readonly type = '[Category] Update';

    constructor(
      public id: number,
      public categoryFormValue: CategoryFormValue
    ) {}
  }

  export class DeleteCategory {
    static readonly type = '[Category] Delete';

    constructor(public id: number) {}
  }
}
