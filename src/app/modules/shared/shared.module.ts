import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardHorizontalComponent } from './components/product-card-horizontal/product-card-horizontal.component';
import { StatusNavComponent } from './components/status-nav/status-nav.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';
import { CreditCardComponent } from './components/credit-card/credit-card.component';


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    ProductAddComponent,
    ProductCardHorizontalComponent,
    StatusNavComponent,
    BreadcrumbsComponent,
    CreditCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    EffectsModule.forFeature([CartEffects])
  ],
  exports: [
    ProductCardComponent,
    ProductCardHorizontalComponent,
    ProductQuantityComponent,
    ProductAddComponent,
    StatusNavComponent,
    BreadcrumbsComponent,
    CreditCardComponent
  ]
})
export class SharedModule { }
