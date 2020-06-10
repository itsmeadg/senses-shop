import { UserEffects } from './store/user.effects';
import { AppRoutingModule } from './../../app-routing.module';
import { FormsModule }   from '@angular/forms';
 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/signin.component';
import { SignUpComponent } from './components/sign-up/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { NotificationsService } from './services/notifications.service';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    EffectsModule.forFeature([UserEffects]),
    FormsModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    DialogComponent
  ],
  exports: [
    HomeComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    NotificationsService
  ]
})
export class CoreModule { }
