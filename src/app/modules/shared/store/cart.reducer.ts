import * as CartActions from './cart.actions';
import { Cart } from '../../checkout/models/cart';
import { CartItem } from './../models/cart-item';

export interface State extends Cart {
  cartLoaded: boolean;
}

const initialState: State = {
  cartLoaded: false,
  dateCreated: '',
  items: null,
  totalPrice: 0,
  totalItemsCount: 0
};

export function cartReducer(state = initialState, action: CartActions.All): State {

  let updateItem = (item: CartItem, update: number) => {
    const previousItemQuantity = item.quantity ? item.quantity : 0;
    const updatedItemQuantity = previousItemQuantity + update;
    const previousItemTotalPrice = item.totalPrice ? item.totalPrice : 0;
    const updatedItemTotalPrice = previousItemTotalPrice + item.price * update;
    let updatedCartItems: { [sku: string]: CartItem };
    if (updatedItemQuantity > 0 || previousItemQuantity === 0) {
      updatedCartItems = {
        ...state.items,
        [item.sku]: {
          ...item,
          quantity: updatedItemQuantity,
          totalPrice: updatedItemTotalPrice
        }
      }
    } else {
      const { [item.sku]: { }, ...itemsWithRemovedSku } = state.items;
      updatedCartItems = itemsWithRemovedSku;
    }

    return {
      ...state,
      items: updatedCartItems,
      totalItemsCount: state.totalItemsCount + update,
      totalPrice: state.totalPrice + item.price * update
    }
  };

  switch (action.type) {

    case (CartActions.GET_CART_SUCCESS):
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        cartLoaded: true
      }
    case (CartActions.CLEAR_CART_SUCCESS):
      return {
        ...state,
        items: null,
        totalPrice: 0,
        totalItemsCount: 0
      }
    case (CartActions.ADD_TO_CART_SUCCESS):
      return updateItem(action.payload, 1);

    case (CartActions.UPDATE_CART_SUCCESS):
      return updateItem(action.payload.item, action.payload.update);

    default:
      return state;
  }
}
