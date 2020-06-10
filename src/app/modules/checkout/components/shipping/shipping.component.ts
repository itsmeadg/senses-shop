import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/cart';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

//ngrx imports
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as CheckoutActions from '../../../../modules/checkout/store/checkout.actions';
import { CartItem } from '../../../shared/models/cart-item';
import { CartService } from '../../../shared/services/cart.service';


@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cart: Cart;
  cartIterable: CartItem[];

  @ViewChild(ShippingFormComponent) shippingForm: ShippingFormComponent;

  constructor(
    private store: Store<fromApp.AppState>,
    private cartService: CartService,
    private router: Router) { }

   ngOnInit() {
    this.cartSubscription = this.store.select(state => state.cart)
      .subscribe(cart => {
        this.cart = cart;
        this.cartIterable = this.cartService.getCartItemsIterable(cart);
      });
  }

  shippingComplete() {
    if (this.shippingForm.form.valid) {
      this.store.dispatch(new CheckoutActions.SaveShippingDetails(this.shippingForm.form.value));
      this.router.navigate(['/checkout/billing']);
    }
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
