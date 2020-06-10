import { Component, Input } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../../checkout/models/cart';
import { Product } from '../../../shop/models/product.model';

@Component({
  selector: 'app-product-card-horizontal',
  templateUrl: './product-card-horizontal.component.html',
  styleUrls: ['./product-card-horizontal.component.scss']
})
export class ProductCardHorizontalComponent {
  imgReady = false;

  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('showActions') showActions = true;
  @Input('cart') cart: Cart;

  constructor(private cartService: CartService) { }

  imageReady() {
    this.imgReady = !this.imgReady;
    console.log(this.imgReady);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
