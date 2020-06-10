import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from './../../modules/auth/guards/auth-guard.service';
import { AdminAuthGuard } from './../../modules/auth/guards/admin-auth-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    // canActivate: [UserAuthGuard, AdminAuthGuard]
  },
  { path: 'admin/products/new',
  component: ProductFormComponent,
  // canActivate: [UserAuthGuard, AdminAuthGuard]
  },
  { path: 'admin/products/:id',
  component: ProductFormComponent,
  // canActivate: [UserAuthGuard, AdminAuthGuard]
  },
  { path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [UserAuthGuard, AdminAuthGuard]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
