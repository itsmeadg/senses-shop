import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

//models
import { Cart } from '../../models/cart';
import { CartItem } from '../../../shared/models/cart-item';
import { Order } from '../../models/order';
import { BillingForm } from './../../models/billing-form';
import { ShippingForm } from './../../models/shipping-form';

//ngrx
import { Store } from '@ngrx/store';
import * as CheckoutActions from './../../store/checkout.actions';
import * as fromApp from '../../../../store/app.reducers';

import { CartService } from '../../../shared/services/cart.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  stateSubscription: Subscription;
  cart: Cart;
  cartIterable: CartItem[];
  shippingInformation: ShippingForm;
  billingInformation: BillingForm;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit() {
    this.stateSubscription = this.store.select(state => {
      const cart = state.cart;
      const checkout = state.checkout;
      return { cart, checkout }
    }).subscribe(stateSlice => {
      this.cart = stateSlice.cart;
      this.cartIterable = this.cartService.getCartItemsIterable(stateSlice.cart);
      this.shippingInformation = stateSlice.checkout.shipping;
      this.billingInformation = stateSlice.checkout.billing;
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  placeOrder() {
    const order = new Order(this.authService.userId(), this.shippingInformation, this.billingInformation, this.cart);
    this.store.dispatch(new CheckoutActions.PlaceOrder(order));
  }
}
