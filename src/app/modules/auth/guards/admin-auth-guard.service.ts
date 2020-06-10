
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';



@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(
    map(appUser => appUser.roles.admin || false));
  }
}
