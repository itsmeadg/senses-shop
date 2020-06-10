import { switchMap } from "rxjs/operators";
import { trigger, transition, style, animate } from "@angular/animations";

import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Cart } from "../../../checkout/models/cart";
import { Product } from "../../models/product.model";

//ngrx imports
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import * as ShopActions from "../../../../modules/shop/store/shop.actions";

@Component({
  selector: "app-shoparea",
  templateUrl: "./shoparea.component.html",
  styleUrls: ["./shoparea.component.scss"],
  animations: [
    trigger("fadeIn", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ShopareaComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  criteria = {};
  cart$: Observable<Cart>;
  loading: Boolean = true;
  loadingSubscription: Subscription;
  productSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(new ShopActions.GetAllProducts());
    this.cart$ = this.store.select(state => state.cart);
    this.loadingSubscription = this.store
      .select(state => state.shop.loading)
      .subscribe(loading => (this.loading = loading));
    this.productSubscription = this.store
      .select(state => state.shop.products)
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        params.keys.forEach(
          param => (this.criteria[param] = params.get(param))
        );
        this.filteredProducts = this.applyFilter(this.products, this.criteria);
        console.log(this.criteria);
        // this.filteredProducts.map(product => product.image = '../../assets/images/1759.jpg')
      });
  }

  private applyFilter(products: Product[], criteria) {
    if (!criteria) return this.products;
    return products.filter(product => {
      return Object.keys(criteria).every(key => {
        if (key === "startPrice" || key === "endPrice") {
          return (
            product["price"] >= criteria["startPrice"] &&
            product["price"] <= criteria["endPrice"]
          );
        } else {
          return product[key] === criteria[key];
        }
      });
    });
  }
}
