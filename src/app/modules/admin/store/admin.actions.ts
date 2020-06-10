import { Action } from "@ngrx/store";
import { Order } from "../../checkout/models/order";

export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';

export class GetOrders implements Action {
    readonly type = GET_ORDERS;
}

export class GetOrdersSuccess implements Action {
    readonly type = GET_ORDERS_SUCCESS;
    constructor(public payload: Order[]) { }
}

export type All =
    GetOrders |
    GetOrdersSuccess;