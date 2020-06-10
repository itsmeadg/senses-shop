
import {map} from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(map(action => {
      // console.log(action);
      return action.map(
        item => {
          const $key = item.payload.key;
          const data = { $key, ...item.payload.val() };
          // console.log(data);
          return data;
      });
    }));
  }

}
