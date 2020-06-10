
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopareaComponent } from './components/shoparea/shoparea.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const shopRoutes: Routes = [
  { path: 'shop', component: ShopareaComponent },
  { path: 'shop/:sku', component: ProductPageComponent },
  { path: 'wishlist', component: WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(shopRoutes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
