import { Injectable } from "@angular/core";
import * as OrderActions from "./order.actions";
import { map, switchMap, take } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { Order } from "../../checkout/models/order";
export type Action = OrderActions.All;

@Injectable()
export class OrderEffects {
  @Effect()
  getOrder: Observable<Action> = this.actions$.pipe(
    ofType(OrderActions.GET_ORDER),
    map((action: OrderActions.GetOrder) => action.payload),
    switchMap((orderId: string) =>
      this.db
        .object<Order>("/orders/" + orderId)
        .valueChanges()
        .pipe(take(1))
    ),
    map((order: Order) => new OrderActions.GetOrderSuccess(order))
  );

  constructor(private actions$: Actions, private db: AngularFireDatabase) {}
}
