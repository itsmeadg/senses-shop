import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShippingForm } from './../../../models/shipping-form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart } from '../../../models/cart';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store/app.reducers';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})

export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: Cart;
  @Output() validityChange = new EventEmitter<boolean>();
  public form: FormGroup;
  private formValues: ShippingForm;
  private stateSubscription: Subscription;
  private formChangeSusbcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.stateSubscription = this.store.select(state => state.checkout.shipping)
      .subscribe(formValues => {
        this.formValues = formValues;
        if (this.formValues) {
          this.form.setValue(this.formValues);
          this.validityChange.emit(this.form.valid);
        }
      });

    this.formChangeSusbcription = this.form.valueChanges
      .subscribe(change => this.validityChange.emit(this.form.valid));
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.formChangeSusbcription.unsubscribe();
  }
}
