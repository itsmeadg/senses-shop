import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user.model';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: String): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }

  wishlistProduct(uid: String, productId: String) {
    this.db.object(`/users/${uid}/wishlist/${productId}`).set(productId);
  }
}
