import { Action } from "@ngrx/store";
import { Order } from "../../checkout/models/order";

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';

export class GetOrder implements Action {
    readonly type = GET_ORDER;
    constructor(public payload: string) {};
}

export class GetOrderSuccess implements Action {
    readonly type = GET_ORDER_SUCCESS;
    constructor(public payload: Order) {};
}

export class PlaceOrder implements Action {
    readonly type = PLACE_ORDER;
    constructor(public payload: Order) {};
}

export class PlaceOrderSuccess implements Action {
    readonly type = PLACE_ORDER_SUCCESS;
    constructor(public payload: Order) {};
}

export type All 
= GetOrder
| GetOrderSuccess
| PlaceOrder
| PlaceOrderSuccess;