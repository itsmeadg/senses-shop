import { Observable ,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

  constructor() { }
  private signInModalVisibilitySource = new BehaviorSubject<boolean>(false);
  signInModalVisibility = this.signInModalVisibilitySource.asObservable();

openModal() {
  this.signInModalVisibilitySource.next(true);
}

closeModal() {
  this.signInModalVisibilitySource.next(false);
}

}
