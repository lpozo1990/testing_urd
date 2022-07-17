import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { CartItem } from '../classes/cart-item';
import { Order } from '../classes/order';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_SERVICES } from '../../config/config';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  
  // Array
  public OrderDetails;
  public order;

  constructor(
    private router: Router,
    private userService: UserService,
    private _http: HttpClient
  ) { }

  // Get order items
  public getOrderItems() : Order {
    return this.OrderDetails;
  }

  public getOrderDetail() {
    return this.order;
  }

  // Create order
  public createOrder(product: any, amount: any, details?: any, formBillingAddress?, addressPrincipal?: boolean ) {
    const item = {
        shippingDetails: details,
        product: product,
        orderId: Math.random().toString(10).substring(10),
        totalAmount: amount,
        // userId: this.userService.user.id,
        clientId: this.userService.user.id,
        billingAddress: formBillingAddress,
        date: Date.now(),
        addressPrincipal
    };
    this.OrderDetails = item;

    console.log(this.OrderDetails);

    let url = URL_SERVICES + 'orders-api';
    url += '?token=' + this.userService.token;

    return this._http.post( url, item ).subscribe( (result) => {
      console.log(result);
      this.router.navigate(['/home/checkout/success']);
    });

  }

  getOrders() {

    const user = this.userService.user.id;

    let url = URL_SERVICES + 'orders-by-users/' + user;
    url += '?token=' + this.userService.token;

    return this._http.get( url );

  }

  getRents() {

    const user = this.userService.user.id;

    let url = URL_SERVICES + 'rents-by-users/' + user;
    url += '?token=' + this.userService.token;

    return this._http.get( url );

  }

  getOrder(order) {

    let url = URL_SERVICES + 'orders-api/' + order;
    url += '?token=' + this.userService.token;

    return this._http.get( url );

  }

  deleteOrder( sale ) {
    const token = this.userService.token;

    let url = URL_SERVICES + 'orders-api/' + sale;
    url += '?token=' + token;

    return this._http.delete( url );
  }

}
