import * as OrderActions from './order.actions';
import { Order } from './../../checkout/models/order';

export interface State {
    currentOrder: Order;
    orders: Order[];
}

const initialState: State  = {
  currentOrder: null,
  orders: []
};

export function orderReducer(state = initialState, action: OrderActions.All): State {

  switch (action.type) {
      case (OrderActions.GET_ORDER_SUCCESS):
        return {
            ...state,
            currentOrder: {
                ...action.payload
            }
        }

    default:
      return state;
  }
}
