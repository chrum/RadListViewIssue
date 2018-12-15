import {Action, State, StateContext} from '@ngxs/store';
import {
    CreateExpense,
    LoadExpenses,
    RemoveExpense
} from './expenses.actions';
import {ExpenseItem} from './definitions';

export interface ExpensesStateModel {
    list: Array<ExpenseItem>;
}

@State<ExpensesStateModel>({
    name: 'expenses',
    defaults: {
        list: [],
    }
})
export class ExpensesState {
    constructor() {

    }

    @Action(LoadExpenses)
    async loadExpenses({patchState}: StateContext<ExpensesStateModel>) {
        patchState({
            list: [
                { title: 'Redux list', cost: 1 }
            ]
        });
    }

    @Action(CreateExpense)
    async createExpense({dispatch, getState, patchState}: StateContext<ExpensesStateModel>, action: CreateExpense) {
        patchState({
            list: [...getState().list, action.data]
        });
    }

    @Action(RemoveExpense)
    async removeExpense({dispatch, getState, patchState}: StateContext<ExpensesStateModel>, action: RemoveExpense) {
        patchState({
            list: getState().list.filter(item => item !== action.expense)
        });
    }
}