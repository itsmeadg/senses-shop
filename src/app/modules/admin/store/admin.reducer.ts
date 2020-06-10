import * as AdminActions from './admin.actions';
import { Order } from '../../checkout/models/order';
import { Product } from '../../shop/models/product.model';

export interface State {
  orders: Order[];
  products: Product[];
}

const initialState: State = {
  orders: [],
  products: []
};

export function adminReducer(state = initialState, action: AdminActions.All) {
  switch (action.type) {
    case (AdminActions.GET_ORDERS_SUCCESS):
      return {
        ...state,
        orders: [ ...action.payload ]
      }

    default:
      return state;
  }
}
