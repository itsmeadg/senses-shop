import { OrderService } from './services/order.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderRoutingRoutingModule } from './order-routing.module';
import { OrderAllComponent } from './components/order-all/order-all.component';
import { OrderEffects } from './store/order.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingRoutingModule,
    EffectsModule.forFeature([OrderEffects]),
  ],
  declarations: [
    OrderDetailsComponent,
    OrderAllComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
