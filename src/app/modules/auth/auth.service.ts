
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { UserService } from './user.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';



import * as firebase from 'firebase';
import { NotificationsService } from '../core/services/notifications.service';
import { AppUser } from './models/app-user.model';



@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private router: Router) {
    this.user$ = afAuth.authState;
  }

  userLoggedIn(): Boolean {
    return firebase.auth().currentUser ? true : false;
  }

  userId() {
    return firebase.auth().currentUser.uid;
  }

  async signIn() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.notificationsService.closeModal();
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['home']));
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return observableOf(null);
      }));
  }






  // //Email definitions
  // signupUser(email: string, password: string) {
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .catch(
  //       error => console.log(error)
  //     );
  // }

  // signinUser(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => console.log(response)
  //     )
  //     .catch(
  //       error => console.log(error)
  //     );
  // }

  // getToken() {
  //   return firebase.auth().currentUser.getToken();
  // }
}
