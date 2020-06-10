import { Injectable } from "@angular/core";
import { map, switchMap, withLatestFrom, take } from "rxjs/operators";
import { AngularFireDatabase } from "angularfire2/database";
import { CartItemUpdate } from "./../models/cart-item-update";
import { Cart } from "../../checkout/models/cart";
import { CartItem } from "../models/cart-item";
import { CartService } from "../services/cart.service";

//ngrx
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as CartActions from "./cart.actions";
import * as fromApp from "../../../store/app.reducers";
import { from } from "rxjs";

export type Action = CartActions.All;

@Injectable()
export class CartEffects {
  private createCart() {
    return this.db.list("shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private getOrCreateCartId(): string {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }
    cartId = this.createCart().key;
    localStorage.setItem("cartId", cartId);
    return cartId;
  }

  private databaseCartUpdatePayload(
    cart: Cart,
    item: CartItem,
    update: number
  ) {
    const previousItemQuantity = item.quantity ? item.quantity : 0;
    const previousItemTotalPrice = item.totalPrice ? item.totalPrice : 0;
    const itemUpdatePayload =
      previousItemQuantity + update
        ? {
            ...item,
            quantity: previousItemQuantity + update,
            totalPrice: previousItemTotalPrice + item.price * update
          }
        : {};
    return {
      items: {
        ...cart.items,
        [item.sku]: {
          ...item,
          quantity: previousItemQuantity + update,
          totalPrice: previousItemTotalPrice + item.price * update
        }
      },
      totalItemsCount: cart.totalItemsCount + update,
      totalPrice: cart.totalPrice + item.price * update
    };
  }

  @Effect()
  getCart = this.actions$.pipe(
    ofType(CartActions.GET_CART),
    withLatestFrom(from(this.cartService.getOrCreateCartId())),
    switchMap((combinedValues: [Action, string]) => {
      const cartId = combinedValues[1];
      return this.db
        .object<Cart>("/shopping-carts/" + cartId)
        .valueChanges()
        .pipe(take(1));
    }),
    map(cart => new CartActions.GetCartSuccess(cart))
  );

  @Effect()
  addToCart = this.actions$.pipe(
    ofType(CartActions.ADD_TO_CART),
    map((action: CartActions.AddToCart) => action.payload),
    withLatestFrom(this.store.select(state => state.cart)),
    withLatestFrom(from(this.cartService.getOrCreateCartId())),
    switchMap((combinedValues: [[CartItem, Cart], string]) => {
      const [cartId, cartItem, cart] = [
        combinedValues[1],
        combinedValues[0][0],
        combinedValues[0][1]
      ];
      return from(
        this.db
          .object("/shopping-carts/" + cartId)
          .update(this.databaseCartUpdatePayload(cart, cartItem, 1))
          .then(() => cartItem)
      );
    }),
    map((cartItem: CartItem) => new CartActions.AddToCartSuccess(cartItem))
  );

  @Effect()
  updateCart = this.actions$.pipe(
    ofType(CartActions.UPDATE_CART),
    map((action: CartActions.UpdateCart) => action.payload),
    withLatestFrom(this.store.select(state => state.cart)),
    withLatestFrom(from(this.cartService.getOrCreateCartId())),
    switchMap(combinedValues => {
      const [cartId, cartItemUpdate, cart] = [
        combinedValues[1],
        combinedValues[0][0],
        combinedValues[0][1]
      ];
      return this.db
        .object("/shopping-carts/" + cartId)
        .update(
          this.databaseCartUpdatePayload(
            cart,
            cartItemUpdate.item,
            cartItemUpdate.update
          )
        )
        .then(() => cartItemUpdate);
    }),
    map(
      (cartItemUpdate: CartItemUpdate) =>
        new CartActions.UpdateCartSuccess(cartItemUpdate)
    )
  );

  @Effect({ dispatch: false })
  removeFromCart = this.actions$.pipe(
    ofType(CartActions.REMOVE_FROM_CART),
    map((action: CartActions.RemoveFromCart) => action.payload),
    switchMap((cartItem: CartItem) => {
      const cartId = this.getOrCreateCartId();
      return this.db
        .object("/shopping-carts/" + cartId + "/items/" + cartItem.sku)
        .remove();
    }),
    map(payload => console.log(payload))
  );

  @Effect()
  clearCart = this.actions$.pipe(
    ofType(CartActions.CLEAR_CART),
    switchMap(() => {
      const cartId = localStorage.getItem("cartId");
      return this.db.object("/shopping-carts/" + cartId + "/items").remove();
    }),
    map(() => new CartActions.ClearCartSuccess())
  );

  constructor(
    private actions$: Actions,
    private db: AngularFireDatabase,
    private cartService: CartService,
    private store: Store<fromApp.AppState>
  ) {}
}
