import { Component, OnInit } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as CartActions from './modules/shared/store/cart.actions';
import * as UserActions from './modules/core/store/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WebShop';
  cartSubscription: Subscription;
  cartLoaded: boolean;

  constructor(
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.GetUser());
    this.cartSubscription = this.store.select(state => state.cart.cartLoaded).subscribe(
      cartLoaded => this.cartLoaded = cartLoaded
    );
    if (!this.cartLoaded) {
      this.store.dispatch(new CartActions.GetCart());
    }
  }
}
