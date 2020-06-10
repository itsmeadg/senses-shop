
import { map, switchMap, take, filter, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product.model';
import { Observable, of, from } from 'rxjs';
import * as ShopActions from './shop.actions';
export type Action = ShopActions.All;

import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';

@Injectable()
export class ShopEffects {

  @Effect()
  getAllProducts: Observable<Action> = this.actions$
    .pipe(ofType(ShopActions.GET_ALL_PRODUCTS),
      switchMap(() => this.db.list<Product>('/products').valueChanges()),
      map((products: Product[]) => new ShopActions.GetAllProductsSuccess(products))
    )

  @Effect()
  getWishlistProducts: Observable<any> = this.actions$
    .pipe(ofType(ShopActions.GET_WISHLIST_PRODUCTS),
      withLatestFrom(this.store.select(state => Object.keys(state.user.currentUser.wishlist))),
      switchMap((combinedValues: [Action, string[]]) => {
        const wishlist = combinedValues[1];
        console.log(wishlist);
        // let productsArray = [];
        return from(combinedValues[1]).pipe(
          mergeMap(sku => this.db.list<Product>('/products/' + sku).valueChanges().pipe(take(1)))
        )
        // wishlist.map((sku) => {
        //      this.db.list<Product>('/products/' + sku).valueChanges().pipe(take(1)).subscribe(product => productsArray.push(product))
        // });
        //     console.log(productsArray);
      }),
      map(products => new ShopActions.GetWishlistProductsSuccess(products))
    )

  @Effect()
  getSimilarProducts: Observable<Action> = this.actions$
    .pipe(ofType(ShopActions.GET_SIMILAR_PRODUCTS),
      switchMap((action: ShopActions.GetSimilarProducts) => {
        // console.log(action.product);
        return this.db.list<Product>('/products',
          ref => ref.orderByChild('category').equalTo(action.product.category)).valueChanges()
      }),
      map((products: Product[]) => new ShopActions.GetSimilarProductsSuccess(products))
    )

  @Effect()
  getProductDetails: Observable<Action> = this.actions$
    .pipe(ofType(ShopActions.GET_PRODUCT_DETAILS),
      map((action: ShopActions.GetProductDetails) => action.payload),
      switchMap((payload: string) => this.db.object<Product>('/products/' + payload).valueChanges()),
      map((product: Product) => new ShopActions.GetProductDetailsSuccess(product))
    )

  constructor(
    private actions$: Actions,
    private db: AngularFireDatabase,
    private store: Store<fromApp.AppState>
  ) { }
}
