import { BillingForm } from './../models/billing-form';
import { ShippingForm } from './../models/shipping-form';
import * as checkout from './checkout.actions';

export interface State {
    shipping: ShippingForm;
    billing: BillingForm;
};

export const initialState: State = {
    shipping: null,
    billing: null
};

export function checkoutReducer(state = initialState, action: checkout.Actions): State {
    switch (action.type) {
        case checkout.SAVE_SHIPPING_DETAILS: {
            return {
                ...state,
                shipping: { ...action.payload }
            };
        }
        case checkout.SAVE_BILLING_DETAILS: {
            return {
                ...state,
                billing: action.payload 
            };
        }
        default: {
            return state;
        }
    }
}