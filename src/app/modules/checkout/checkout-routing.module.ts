import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from './../auth/guards/auth-guard.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { BillingComponent } from './components/billing/billing.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'shipping',
        component: ShippingComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'billing',
        component: BillingComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        canActivate: [UserAuthGuard]
      }
    ]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    // canActivate: [UserAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
