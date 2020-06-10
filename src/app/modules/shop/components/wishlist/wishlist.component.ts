
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as ShopActions from '../../../shop/store/shop.actions';
import { Cart } from '../../../checkout/models/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  cart: Cart;
  cartSubscription: Subscription;
  wishlistedProducts: Product[];
  wishlistedProductsSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.cartSubscription = this.store.select(state => state.cart).subscribe(cart => this.cart = cart);
    this.store.dispatch(new ShopActions.GetWishlistProducts());
    this.wishlistedProductsSubscription = this.store.select(state => state.shop.wishlistedProducts)
      .subscribe(wishlistedProducts => this.wishlistedProducts = wishlistedProducts);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.wishlistedProductsSubscription.unsubscribe();
  }
}
