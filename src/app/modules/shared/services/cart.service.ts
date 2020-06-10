import { CartItem } from './../models/cart-item';

import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


import { Cart } from '../../checkout/models/cart';
import { Product } from '../../shop/models/product.model';

@Injectable()
export class CartService {

  constructor(private db: AngularFireDatabase) { }

  getCartItemsIterable(cart: Cart) {
    let cartItemsIterable: CartItem[] = [];
    for (let sku in cart.items) {
      cartItemsIterable.push(cart.items[sku]);
    }
    return cartItemsIterable;
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
    // localStorage.removeItem('cartId');
  }

  private createCart() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCartProduct(cartId: string, sku: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + sku);
  }

  async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    cartId = await this.createCart().key;
    localStorage.setItem('cartId', cartId);
    return cartId;

  }
  private productCartRelevantDetails(product: Product) {
    const cartRelevantDetails = {
      name: product.name,
      price: product.price,
      currency: product.currency,
      category: product.category,
      image: product.image,
      gender: product.gender,
      color: product.color,
      sku: product.sku
    };
    return cartRelevantDetails;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getCartProduct(cartId, product.sku);
    const item$ = itemRef.snapshotChanges().pipe(take(1));
    item$.subscribe((prod: any) => {
      const quantity = (prod.payload.val()) ? (prod.payload.val().quantity + change) : 1;
      if (quantity === 0) {
        itemRef.remove();
      } else {
        itemRef.update({ ...this.productCartRelevantDetails(product), quantity: quantity });
      }
    });
  }

}
