import {ExpenseItem} from './definitions';

export class LoadExpenses {
    static readonly type = '[Expenses] Load';
    constructor() {}
}

export class CreateExpense {
    static readonly type = '[Expenses] Create';
    constructor(public data: any) {}
}

export class RemoveExpense {
    static readonly type = '[Expenses] Remove';
    constructor(public expense: ExpenseItem) {}
}
