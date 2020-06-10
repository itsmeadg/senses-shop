import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NotificationsService } from './../../core/services/notifications.service';
import { AuthService } from '../auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if(this.authService.userLoggedIn()) { return true; }
    this.router.navigate(['/home'], { queryParams: { returnUrl: url } }).then(
      () => this.notificationsService.closeModal()
    );
    return false;
  }
}
