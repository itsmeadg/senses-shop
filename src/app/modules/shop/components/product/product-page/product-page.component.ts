import { take, map, switchMap, filter } from 'rxjs/operators';
//general
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

//rxjs
import { Subscription, Observable } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store/app.reducers';
import * as ShopActions from '../../../store/shop.actions';
import * as CartActions from '../../../../shared/store/cart.actions';

//Model imports
import { Cart } from '../../../../checkout/models/cart';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit, OnDestroy {
  // currentProduct: Product;
  currentProduct: Product = null;
  private currentProductSubscription$: Subscription;
  sku: string;
  similarProducts: Product[] = [];
  similarProductsSubscription$: Subscription;
  cart$;

  curentProduct$;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.sku = this.route.snapshot.paramMap.get('sku');
    if (this.sku) this.store.dispatch(new ShopActions.GetProductDetails(this.sku));

    this.currentProductSubscription$ = this.store.select(state => state.shop.currentProduct).pipe(
      filter(product => product !== null)
    ).subscribe(product => {
      this.currentProduct = product;
      this.store.dispatch(new ShopActions.GetSimilarProducts(product, 5));
    })

    this.similarProductsSubscription$ = this.store.select(state => state.shop.similarProducts).pipe(
      filter(similarProducts => similarProducts !== null)
    ).subscribe(similarProducts => {
      this.similarProducts = similarProducts.filter(product =>
        product.sku !== this.sku && product.gender === this.currentProduct.gender).slice(0, 3)
    })

    this.cart$ = this.store.select(state => state.cart);
  }

  ngOnDestroy() {
    this.currentProductSubscription$.unsubscribe();
    this.similarProductsSubscription$.unsubscribe();
  }
}
