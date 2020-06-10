
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../../checkout/models/cart';
import { Product } from '../../../shop/models/product.model';
import { AuthService } from './../../../auth/auth.service';
import { UserService } from './../../../auth/user.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ visibility: 'hidden' }),
        animate(500, style({ visibility: 'visible' }))
      ])
    ])
  ]
})
export class ProductCardComponent {
  imgReady = false;

  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  @Input('cart') cart: Cart;
  @Input('wishlisted') wishlisted: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService) { }

  imageReady() {
    this.imgReady = !this.imgReady;
    console.log(this.imgReady);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  toggleWishlist(productId: String) {
    // if (this.authService.userLoggedIn()) {
    //   this.authService.userId().take(1).subscribe(
    //     userId => this.userService.wishlistProduct(userId, productId)
    //   );
    // }
    this.wishlisted = !this.wishlisted;
  }
}
