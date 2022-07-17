import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICES_IMG } from '../../config/config';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  order;
  URL_SERVICES_IMG = URL_SERVICES_IMG;

  constructor(
    public activatedRoute: ActivatedRoute,
    private orderService: OrderService
    ) {

      activatedRoute.params.subscribe( async params => {

        let id = params['order'];

        this.orderService.getOrder(id).subscribe( (order) => {
          console.log(order);
          this.order = order;
        });

      });
  }

  ngOnInit(): void {

  }

}
