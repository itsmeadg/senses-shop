import { Component, OnInit, Input } from "@angular/core";

import { CartService } from "../../services/cart.service";
import { Product } from "../../../shop/models/product.model";

import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import * as CartActions from "../../../shared/store/cart.actions";
import { Cart } from "../../../checkout/models/cart";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.scss"]
})
export class ProductQuantityComponent implements OnInit {
  @Input("product") product: Product;
  @Input("cart") cart: Cart;

  constructor(private store: Store<fromApp.AppState>) {}

  private cartUpdate(update: number) {
    if (this.product.sku in this.cart.items) {
      const cartItemUpdate = {
        item: this.cart.items[this.product.sku],
        update: update
      };
      this.store.dispatch(new CartActions.UpdateCart(cartItemUpdate));
    }
  }

  addToCart() {
    this.cartUpdate(1);
  }

  removeFromCart() {
    this.cartUpdate(-1);
  }

  ngOnInit() {
    this.store
      .select(state => state.cart)
      .subscribe(cart => (this.cart = cart));
  }
}
