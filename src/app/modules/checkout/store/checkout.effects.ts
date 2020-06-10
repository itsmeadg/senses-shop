import { Order } from "./../models/order";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as CheckoutActions from "./checkout.actions";
import { AngularFireDatabase } from "angularfire2/database";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  placeOrder = this.actions$.pipe(
    ofType(CheckoutActions.PLACE_ORDER),
    map((action: CheckoutActions.PlaceOrder) => action.payload),
    switchMap((order: Order) => this.db.list("/orders").push(order)),
    map(reference => {
      this.router.navigate(["/order-success", reference.key]);
    })
  );
  // map((cartItem) => new CheckoutActions.PlaceOrderSuccess(cartItem))
}
