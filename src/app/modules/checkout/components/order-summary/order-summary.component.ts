import { CartItem } from './../../../shared/models/cart-item';
import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../models/cart';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input('cart') cart: Cart;
  @Input('cartIterable') cartIterable: CartItem[];

  constructor() { }

  ngOnInit() {
  }

}
