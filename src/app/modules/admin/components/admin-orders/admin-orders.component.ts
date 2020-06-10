import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';


//ngrx
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as AdminActions from '../../store/admin.actions';
import { Order } from '../../../checkout/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  subscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['userId','date', 'totalPrice', 'totalItems'];
  dataSource;

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new AdminActions.GetOrders());
    this.subscription = this.store.select(state => state.admin.orders).subscribe(orders => {
      this.dataSource = orders;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
