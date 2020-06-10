import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { SharedModule } from './../shared/shared.module';
import { CategoryService } from './services/category.service';
import { ShopRoutingModule } from './shop-routing.module';

import { ProductService } from './services/product.service';
import { ShopareaComponent } from './components/shoparea/shoparea.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFilterComponent } from './components/product/product-filter/product-filter.component';
import { CartService } from '../shared/services/cart.service';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './store/shop.effects';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    ShopareaComponent,
    ProductFilterComponent,
    ProductPageComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ShopEffects])
  ],
  providers: [
    ProductService,
    CartService,
    CategoryService
  ]
})

export class ShopModule { }
