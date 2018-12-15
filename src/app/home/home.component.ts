import { Component, OnInit } from "@angular/core";
import {Observable} from "rxjs";
import {Select, Store} from '@ngxs/store';
import {CreateExpense, LoadExpenses, RemoveExpense} from "~/app/home/expenses.actions";
import {ListViewEventData} from "nativescript-ui-listview";
import {View} from "tns-core-modules/ui/core/view";
import {ExpenseItem} from "~/app/home/definitions";
import {ObservableArray} from "tns-core-modules/data/observable-array";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    list = new ObservableArray([{ title: 'List', cost: 1 }]);
    @Select(state => state.expenses.list) list$: Observable<Array<ExpenseItem>>;
    counter = 0;

    constructor(private _store: Store) {
        this._store.dispatch(new LoadExpenses());
    }

    ngOnInit() {
    }

    public add() {
        const expense = {title: 'Auchan ' + this.counter , cost: 50};
        this._store.dispatch(new CreateExpense(expense));
        this.list.push(expense);

        this.counter++;
    }

    public removeRegular(expense) {
        this.list.splice(this.list.indexOf(expense), 1);
    }

    public removeRedux(expense) {
        this._store.dispatch(new RemoveExpense(expense));
    }

    //////////////////////
    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['object'];
        const rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = swipeLimits.right / 2;
    }
}
