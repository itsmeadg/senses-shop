import * as ShopActions from './shop.actions';
import { Product } from '../models/product.model';

export interface State {
  products: Product[];
  currentProduct: Product;
  similarProducts: Product[];
  wishlistedProducts: Product[];
  loading: boolean;
}

const initialState: State = {
  products: [],
  currentProduct: null,
  similarProducts: [],
  wishlistedProducts: [],
  loading: false
};

export function shopReducer(state = initialState, action: ShopActions.All) {
  switch (action.type) {
    case(ShopActions.GET_ALL_PRODUCTS):
      return {
        ...state,
        loading: true
      }
    case(ShopActions.GET_ALL_PRODUCTS_SUCCESS):
      return {
        ...state,
        loading: false,
        products: [...action.payload]
      }
    case (ShopActions.GET_PRODUCT_DETAILS_SUCCESS):
      return {
        ...state,
        currentProduct: { ...action.payload },
        loading: false
      }
    case (ShopActions.GET_SIMILAR_PRODUCTS_SUCCESS):
      return {
        ...state,
        similarProducts: [...action.payload]
      }
    case (ShopActions.GET_WISHLIST_PRODUCTS_SUCCESS):
      return {
        ...state,
        wishlistedProducts: [...action.payload]
      }
    default:
      return state;
  }
}
