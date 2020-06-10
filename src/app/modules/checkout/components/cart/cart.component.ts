import { CartItem } from './../../../shared/models/cart-item';
import { AppUser } from './../../../auth/models/app-user.model';

import { NotificationsService } from './../../../core/services/notifications.service';
import { CartService } from '../../../shared/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as CartActions from '../../../../modules/shared/store/cart.actions';

import { AuthService } from '../../../auth/auth.service';
import { filter } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  loading: boolean;
  appUser: AppUser;
  
  cartSubscription: Subscription;
  cart: Cart;
  cartIterable: CartItem[];

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService) { }

  ngOnInit() {
    this.cartSubscription = this.store.select(state => state.cart)
      .subscribe(cart => {
        this.cart = cart;
        this.cartIterable = this.cartService.getCartItemsIterable(cart);
      });
    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  checkOut() {
    this.router.navigate(['/checkout/shipping']);
  }

  clearCart() {
    this.store.dispatch(new CartActions.ClearCart());
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
