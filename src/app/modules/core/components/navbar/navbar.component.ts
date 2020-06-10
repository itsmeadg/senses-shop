import { Subscription, Observable } from 'rxjs';
import { NotificationsService } from './../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../checkout/models/cart';
import { User } from './../../../auth/models/app-user.model';


//ngrx imports
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as UserActions from '../../../core/store/user.actions';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showDialog: boolean;
  user: User;
  cart$: Observable<Cart>;
  authModalSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.store.select(state => state.user.currentUser).subscribe(user => { this.user = user });
    this.authModalSubscription = this.notificationsService.signInModalVisibility.subscribe(visible => {
      this.showDialog = visible;
    });
    this.cart$ = this.store.select(state => state.cart);
  }

  login() {
    this.notificationsService.openModal();
  }

  logout() {
    this.store.dispatch(new UserActions.Logout());
  }
}
