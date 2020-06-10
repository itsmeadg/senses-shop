import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from '../modules/core/store/user.reducer';
import * as fromCheckout from '../modules/checkout/store/checkout.reducer';
import * as fromShop from '../modules/shop/store/shop.reducer';
import * as fromCart from '../modules/shared/store/cart.reducer';
import * as fromOrder from '../modules/order/store/order.reducer';
import * as fromAdmin from '../modules/admin/store/admin.reducer';

export interface AppState {
  user: fromUser.State;
  shop: fromShop.State;
  cart: fromCart.State;
  checkout: fromCheckout.State;
  order: fromOrder.State;
  admin: fromAdmin.State;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer,
  shop: fromShop.shopReducer,
  cart: fromCart.cartReducer,
  checkout: fromCheckout.checkoutReducer,
  order: fromOrder.orderReducer,
  admin: fromAdmin.adminReducer
};
