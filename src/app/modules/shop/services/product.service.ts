
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  products = null;
  selectedProduct;
  productArray;

  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase) { }

  getAll(): Observable<Product[]>{
    return this.db.list('/products')
      .snapshotChanges().pipe(
        map(action => {
      return action.map(
        (item: any) => {
          const data = { ...item.payload.val() };
          // console.log(data);
          return data;
        });
    }));
  }

getProductsByCategory(category: string, results: number): Observable<Product[]> {
  return this.db.list<Product>('/products',
    ref => ref.orderByChild('category')
      .equalTo(category)
      .limitToFirst(results))
    .valueChanges();
}

create(product: Product) {
  return this.db.list('/products').push(product);
}

get(productId: String) {
  return this.db.object<Product>('/products/' + productId).valueChanges();
}

update(productId, product: Product) {
  return this.db.object('/products' + productId).update(product);
}

delete (productId: String) {
  return this.db.object('/product/' + productId).remove();
}
}

