import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderAllComponent } from './components/order-all/order-all.component';
import { UserAuthGuard } from './../auth/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'order-success/:id',
    component: OrderDetailsComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: []
  },
  {
    path: 'order-all',
    component: OrderAllComponent,
    canActivate: [UserAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingRoutingModule { }
