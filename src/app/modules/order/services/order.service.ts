
import {map} from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../checkout/models/order';


@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/orders').snapshotChanges().pipe(map(action => {
      // console.log(action);
      return action.map(
        item => {
          const data = { ...item.payload.val() };
          // console.log(data);
          return data;
        });
    }));
  }

  getOrder(orderId): Observable<Order> {
    return this.db.object<Order>('/orders/' + orderId)
      .valueChanges();
  }

  delete(orderId) {
    return this.db.object('/orders/' + orderId).remove();
  }
}
