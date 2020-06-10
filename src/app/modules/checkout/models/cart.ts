import { CartItem } from './../../shared/models/cart-item';

import { Product } from '../../shop/models/product.model';

export class Cart {
  dateCreated: string;
  totalPrice: number;
  totalItemsCount: number;
  items: { [sku: string]: CartItem };
  // private cartItemsIterable: CartItem[] | undefined;
  // getCartItemsIterable() {
  //   for (let sku in this.items) {
  //     this.cartItemsIterable.push(this.items[sku]);
  //   }
  //   return this.cartItemsIterable;
  // }

  // constructor(cart: Partial<ShoppingCart>) {
  //   this.dateCreated = cart.dateCreated || '';
  //   this.items = cart.items || {};
  //   for (const sku in this.items) {
  //     const item = this.items[sku];
  //     this.itemsArray.push(new ShoppingCartItem({ ...item }));
  //   }
  //   console.log(this.itemsArray);
  // }

  // getQuantity(product: Product) {
  //   const item = this.items[product.sku];
  //   return item ? item.quantity : 0;
  // }

  // get cartTotalPrice() {
  //   let sum = 0;
  //   for (let productId in this.items) {
  //     sum += this.items[productId].totalPrice;
  //   }
  //   return sum;
  // }

  // get cartTotalItemsCount() {
  //   let count = 0;
  //   for (const sku in this.items) {
  //     count += this.items[sku].quantity;
  //   }
  //   return count;
  // }
}
