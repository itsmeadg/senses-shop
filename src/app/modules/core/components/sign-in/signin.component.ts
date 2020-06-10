import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../../../store/app.reducers';
import * as UserActions from '../../../core/store/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  loaded = false;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() { }

  signInWithUserPass(form: NgForm) {
    const username = this.email;
    const password = this.password;
    this.store.dispatch(new UserActions.UserPassLogin({ username, password }))
  }
  signInWithGoogle() {
    this.store.dispatch(new UserActions.GoogleLogin());
  }
}
