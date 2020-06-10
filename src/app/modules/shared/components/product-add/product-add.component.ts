import { AddToCart } from './../../store/cart.actions';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Product } from '../../../shop/models/product.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as CartActions from '../../../shared/store/cart.actions';
import { CartItem } from '../../models/cart-item';
import { Cart } from '../../../checkout/models/cart';


@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  @Input('product') product: Product;
  @Input('cart') cart: Cart;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  addToCart() {
    this.store.dispatch(new CartActions.AddToCart(new CartItem(this.product)));
  }

  getProductQuantity(product) {
    if (this.cart.items) {
      if (this.cart.hasOwnProperty('items')) {
        if (this.cart.items.hasOwnProperty(product.sku)) {
          const item = this.cart.items[product.sku];
          return item ? item.quantity : 0;
        }
      }
    }
    return 0;
  }
}
