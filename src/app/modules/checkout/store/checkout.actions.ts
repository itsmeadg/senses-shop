import { ShippingForm } from './../models/shipping-form';
import { Action } from '@ngrx/store';
import { Order } from '../models/order';

export const GET_SHIPPING_DETAILS = 'GET_SHIPPING_DETAILS';
export const SAVE_SHIPPING_DETAILS = 'SAVE_SHIPPING_DETAILS';

export const GET_BILLING_DETAILS = 'GET_BILLING_DETAILS';
export const SAVE_BILLING_DETAILS = 'SAVE_BILLING_DETAILS';

export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';

export class GetShippingDetails implements Action {
    readonly type = GET_SHIPPING_DETAILS;
}

export class SaveShippingDetails implements Action {
    readonly type = SAVE_SHIPPING_DETAILS;
    constructor(public payload: ShippingForm) {};
}

export class GetBillingDetails implements Action {
    readonly type = GET_BILLING_DETAILS;
}

export class SaveBillingDetails implements Action {
    readonly type = SAVE_BILLING_DETAILS;
    constructor(public payload: any) {};
}

export class PlaceOrder implements Action {
    readonly type = PLACE_ORDER;
    constructor(public payload: Order) {};
}

export class PlaceOrderSuccess implements Action {
    readonly type = PLACE_ORDER_SUCCESS;
    constructor(public payload: Order) {};
}

export type Actions 
    = GetShippingDetails
    | SaveShippingDetails
    | GetBillingDetails
    | SaveBillingDetails
    | PlaceOrder
    | PlaceOrderSuccess;




