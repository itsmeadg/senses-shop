

// Generic NG modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// General app and evironment imports
import { AppComponent } from './app.component';
import { environment } from './../../environments/environment';

//Feature Modules
import { AdminModule } from './modules/admin/admin.module';
import { ShopModule } from './modules/shop/shop.module';
import { OrderModule } from './modules/order/order.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { CoreModule } from './modules/core/core.module';

// Routing modules
import { AppRoutingModule } from './app-routing.module';

// General services
import { UserService } from './modules/auth/user.service';
import { UserAuthGuard } from './modules/auth/guards/auth-guard.service';

//Firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

//Auth service and guard
import { AuthService } from './modules/auth/auth.service';
import { AdminAuthGuard } from './modules/auth/guards/admin-auth-guard.service';

//Dev redux
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './modules/shop/store/shop.effects';
import { CartEffects } from './modules/shared/store/cart.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    ShopModule,
    OrderModule,
    CoreModule,
    CheckoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([
      CartEffects
    ])
  ],
  providers: [
    AuthService,
    UserService,
    UserAuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
