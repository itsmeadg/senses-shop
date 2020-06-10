import { Action } from "@ngrx/store";
import { CartItem } from "../models/cart-item";
import { CartItemUpdate } from './../models/cart-item-update';
import { Cart } from "../../checkout/models/cart";
import { Product } from "../../shop/models/product.model";

export const GET_CART = 'GET_CART';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';

export const REMOVE_FROM_CART = 'REMOVE_TO_CART';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_TO_CART_SUCCESS';

export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';

export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';

export class GetCart implements Action {
    readonly type = GET_CART;
}

export class GetCartSuccess implements Action {
    readonly type = GET_CART_SUCCESS;
    constructor(public payload: Cart) { }
}

export class AddToCart implements Action {
    readonly type = ADD_TO_CART;
    constructor(public payload: CartItem) { }
}

export class AddToCartSuccess implements Action {
    readonly type = ADD_TO_CART_SUCCESS;
    constructor(public payload: CartItem) { }
}

export class UpdateCart implements Action {
    readonly type = UPDATE_CART;
    constructor(public payload: CartItemUpdate) { }
}

export class UpdateCartSuccess implements Action {
    readonly type = UPDATE_CART_SUCCESS;
    constructor(public payload: CartItemUpdate) { }
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART;
    constructor(public payload: CartItem) { }
}

export class RemoveFromCartSuccess implements Action {
    readonly type = REMOVE_FROM_CART_SUCCESS;
    constructor(public payload: CartItem) { }
}

export class ClearCart implements Action {
    readonly type = CLEAR_CART;
}

export class ClearCartSuccess implements Action {
    readonly type = CLEAR_CART_SUCCESS;
}

export type All =
    GetCart |
    GetCartSuccess |
    AddToCart |
    AddToCartSuccess |
    UpdateCart |
    UpdateCartSuccess |
    ClearCart |
    ClearCartSuccess;