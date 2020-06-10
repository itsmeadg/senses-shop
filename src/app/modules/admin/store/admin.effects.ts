import { Order } from './../../checkout/models/order';
import { take, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as AdminActions from './admin.actions';
export type Action = AdminActions.All;


@Injectable()
export class AdminEffects {

    @Effect()
    getAllProducts: Observable<Action> = this.actions$
        .pipe(
            ofType(AdminActions.GET_ORDERS),
            switchMap((action: AdminActions.GetOrders) => this.db.list<Order>('/orders').valueChanges().pipe(take(1))),
            map((orders: Order[]) => new AdminActions.GetOrdersSuccess(orders))
        )

    constructor(
        private actions$: Actions,
        private db: AngularFireDatabase
    ) { }
}
