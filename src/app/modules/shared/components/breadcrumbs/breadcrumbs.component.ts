import { Router } from '@angular/router';
import { BillingForm } from './../../../checkout/models/billing-form';
import { ShippingForm } from './../../../checkout/models/shipping-form';
import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from '../../models/breadcrumb';
import { Subscription } from 'rxjs';

//ngrx imports
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as CheckoutActions from '../../../../modules/checkout/store/checkout.actions';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  stateSubscription: Subscription;
  shippingValues: ShippingForm;
  billingValues: BillingForm;

  breadcrumbs: BreadCrumb[] = [
    {
      name: "Cart",
      url: "/checkout/cart",
      accesible: true,
      completed: true
    },
    {
      name: "Shipping",
      url: "/checkout/shipping",
      accesible: true,
      completed: this.shippingValues ? true : false
    },
    {
      name: "Billing",
      url: "/checkout/billing",
      accesible: this.shippingValues ? true : false,
      completed: this.billingValues ? true : false
    },
    {
      name: "Confirmation",
      url: "/checkout/confirmation",
      accesible: this.shippingValues && this.billingValues ? true : false,
      completed: false
    }
  ]

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.stateSubscription = this.store.select(state => state.checkout.shipping).subscribe(shipping => {
      this.shippingValues = shipping;
      // this.billingValues = checkout.billing;
      console.log(this.shippingValues ? true : false)
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  navigate(breadcrumb: BreadCrumb) {
    console.log(breadcrumb);
    if(breadcrumb.accesible) {
      this.router.navigate([breadcrumb.url]);
    }
  }
}