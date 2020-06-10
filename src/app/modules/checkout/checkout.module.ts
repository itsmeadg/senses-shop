import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ShippingFormComponent } from './components/shipping/shipping-form/shipping-form.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BillingComponent } from './components/billing/billing.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { EffectsModule } from '@ngrx/effects';
import { CheckoutEffects } from './store/checkout.effects';
import { BillingFormComponent } from './components/billing/billing-form/billing-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { OrdersComponent } from './components/orders/orders.component';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    SharedModule,
    EffectsModule.forFeature([CheckoutEffects]),
    NgxStripeModule.forRoot('pk_test_6m8kg5qjHQU9ded9AvcbMChg'),
  ],
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrderSummaryComponent,
    ShippingComponent,
    ShippingFormComponent,
    BillingComponent,
    BillingFormComponent,
    ConfirmationComponent,
    OrdersComponent
  ]
})

export class CheckoutModule { }
