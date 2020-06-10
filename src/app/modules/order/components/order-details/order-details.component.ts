import { CartItem } from "./../../../shared/models/cart-item";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Order } from "../../../checkout/models/order";

//rxjs
import { Observable, Subscription } from "rxjs";

//ngrx
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import * as OrderActions from "../../../../modules/order/store/order.actions";

@Component({
  selector: "order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"]
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  order$: Observable<Order>;
  orderSubscription: Subscription;
  order: Order;
  items: CartItem[];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.store.dispatch(new OrderActions.GetOrder(this.orderId));
    console.log(this.orderId);
    // this.order$ = this.store.select(state => state.order.currentOrder);
    this.store.select(state => state.order.currentOrder).subscribe(order => {
      if (!order) return;
      this.order = order;
      this.items = Object.values(order.cart.items);
    });
  }
}
