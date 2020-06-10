import { AngularFireDatabase, DatabaseSnapshot } from "angularfire2/database";
import { NotificationsService } from "./../services/notifications.service";
import {
  switchMap,
  mergeMap,
  tap,
  map,
  catchError,
  take,
  first
} from "rxjs/operators";
import { of, Observable, from } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as UserActions from "./user.actions";
import * as firebase from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../auth/models/app-user.model";

export type Action = UserActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private notificationsService: NotificationsService
  ) {}

  // @Effect()
  // authSignup = this.actions$
  //     .ofType(UserActions.TRY_SIGNUP).pipe(
  //         map((action: UserActions.TrySignup) => {
  //             return action.payload;
  //         }),
  //         switchMap((authData: { username: string, password: string }) => {
  //             return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
  //         }),
  //         switchMap(() => {
  //             return from(firebase.auth().currentUser.getIdToken());
  //         }),
  //         mergeMap((token: string) => {
  //             return [
  //                 {
  //                     type: UserActions.SIGNUP
  //                 },
  //                 {
  //                     type: UserActions.SET_TOKEN,
  //                     payload: token
  //                 }
  //             ];
  //         }), );

  @Effect()
  userPassLogin = this.actions$.pipe(
    ofType(UserActions.USERPASS_LOGIN),
    map((action: UserActions.UserPassLogin) => action.payload),
    switchMap((authData: { username: string; password: string }) => {
      return from(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.username, authData.password)
      );
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(["/"]);
      return [
        {
          type: UserActions.USERPASS_LOGIN_SUCCESS
        },
        {
          type: UserActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(UserActions.LOGOUT),
    tap(() => {
      this.afAuth.auth.signOut().then(() => this.router.navigate(["home"]));
    })
  );

  @Effect()
  googleLogin = this.actions$.pipe(
    ofType(UserActions.GOOGLE_LOGIN),
    switchMap(() => {
      const returnUrl =
        this.route.snapshot.queryParamMap.get("returnUrl") || "/";
      localStorage.setItem("returnUrl", returnUrl);
      return from(this.googleFirebaseLogin());
    }),
    map(() => new UserActions.GetUser()),
    catchError(error => of(new UserActions.AuthError(error)))
  );

  @Effect()
  getUser: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.GET_USER),
    switchMap(() => this.afAuth.authState),
    switchMap(authData => {
      if (authData) return this.getFirebaseUser(authData.uid);
      else return of(null);
    }),
    map((user: User) => {
      if (user) return new UserActions.Authenticated(user);
      else return new UserActions.NotAuthenticated();
    }),
    catchError(error => of(new UserActions.AuthError(error)))
  );

  private googleFirebaseLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private getFirebaseUser(uid: String): Observable<any> {
    return this.db
      .object<DatabaseSnapshot<User>>("/users/" + uid)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          return { uid: snapshot.key, ...snapshot.payload.val() };
        }),
        first()
      );
  }
}
