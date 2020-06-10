import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/core/components/home/home.component';
import { ShopareaComponent } from './modules/shop/components/shoparea/shoparea.component';
import { SignInComponent } from './modules/core/components/sign-in/signin.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'shop', component: ShopareaComponent },
  { path: 'login', component: SignInComponent }
  // { path: 'about', component: AboutUsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
