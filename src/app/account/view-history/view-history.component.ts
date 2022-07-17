import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICES_IMG } from '../../config/config';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {

  history;
  URL_SERVICES_IMG = URL_SERVICES_IMG;

  constructor(
    public activatedRoute: ActivatedRoute,
    private orderService: OrderService
    ) {

      activatedRoute.params.subscribe( async params => {

        let id = params['order'];

        this.orderService.getOrder(id).subscribe( (order) => {
          console.log(order);
          this.history = order;
        });

      });
  }

  ngOnInit(): void {

  }

}
