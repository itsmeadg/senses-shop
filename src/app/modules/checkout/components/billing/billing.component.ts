import { BillingFormComponent } from './billing-form/billing-form.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Cart } from '../../models/cart';
import { Observable, Subscription } from 'rxjs';

//ngrx imports
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as CheckoutActions from '../../../../modules/checkout/store/checkout.actions';
import { StripeService } from 'ngx-stripe';
import { BillingForm } from '../../models/billing-form';
import { CartItem } from '../../../shared/models/cart-item';
import { CartService } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit, OnDestroy {
  @ViewChild(BillingFormComponent) billingFormComponent: BillingFormComponent;
  billingFormValues: BillingForm;
  private billingFormValid: boolean;

  cartSubscription: Subscription;
  cart: Cart;
  cartIterable: CartItem[];

  constructor(
    private store: Store<fromApp.AppState>,
    private cartService: CartService,
    private router: Router,
    private stripeService: StripeService) { }

  async ngOnInit() {
    this.cartSubscription = this.store.select(state => state.cart)
      .subscribe(cart => {
        this.cart = cart;
        this.cartIterable = this.cartService.getCartItemsIterable(cart);
      });
  }

  billingComplete() {
    const name = this.billingFormComponent.form.get('name').value;
    const postCode = this.billingFormComponent.form.get('postCode').value;
    this.stripeService
      .createToken(this.billingFormComponent.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          // console.log(result);
          this.store.dispatch(new CheckoutActions.SaveBillingDetails({
            name,
            postCode,
            brand: result.token.card.brand,
            last4: result.token.card.last4,
            cardToken: result.token.id
          }));
          this.router.navigate(['/checkout/confirmation']);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
