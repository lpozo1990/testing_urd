import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { URL_SERVICES_IMG } from '../../../config/config';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  
  public orderDetails : Order = {};
  URL_SERVICES_IMG = URL_SERVICES_IMG;

  constructor(
    private orderService: OrderService,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartService.removeAllCart();
    this.orderDetails = this.orderService.getOrderItems();
  }

}
