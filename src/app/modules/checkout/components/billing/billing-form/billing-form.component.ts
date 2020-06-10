import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BillingForm } from './../../../models/billing-form';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//ngrx imports
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store/app.reducers';

@Component({
  selector: 'billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})
export class BillingFormComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @Output() validityChange = new EventEmitter<boolean>();
  public form: FormGroup;
  private formValues: BillingForm;
  private cardValidStatus: boolean;
  private stateSubscription: Subscription;
  private cardValiditySubscription: Subscription;
  private formChangeSusbcription: Subscription;

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '1.1rem',
        '::placeholder': {
          color: '#999'
        }
      }
    },
    hidePostalCode: true
  };

  private emitValidity() {
    let validStatus: boolean = false;
    validStatus = this.form.valid && this.cardValidStatus ? true : false;
    this.validityChange.emit(validStatus);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      postCode: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.stateSubscription = this.store.select(state => state.checkout.billing)
      .subscribe(formValues => {
        this.formValues = formValues;
        if (this.formValues) {
          this.form.setValue({
            name: this.formValues.name,
            postCode: this.formValues.postCode
          });
          this.validityChange.emit(this.form.valid);
        }
      });

    this.cardValiditySubscription = this.card.on.pipe(
      filter(cardEvent => cardEvent.type === "change" && cardEvent.event.complete)
    ).subscribe(cardEvent => this.cardValidStatus = cardEvent.event.complete);

    this.formChangeSusbcription = this.form.valueChanges
      .subscribe(change => this.emitValidity());
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.cardValiditySubscription.unsubscribe();
    this.formChangeSusbcription.unsubscribe();
  }
}