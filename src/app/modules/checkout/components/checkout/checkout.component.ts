import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../shared/models/cart-item';
import { Cart } from '../../models/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartSubscription: Subscription;
  cart: Cart;
  cartIterable: CartItem[];

  constructor(
    private store: Store<fromApp.AppState>,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartSubscription = this.store.select(state => state.cart)
      .subscribe(cart => {
        this.cart = cart;
        this.cartIterable = this.cartService.getCartItemsIterable(cart);
      });
  }

}