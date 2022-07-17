import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {

  sales: any = [];
  loading: boolean = true;
  pageActual: number = 1;
  pageSize: number = 10;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {

    this.orderService.getOrders().subscribe( (sales) => {
      this.sales = sales;
    });
  }

  deleteOrder( sale ) {

    swal.fire({
      title: 'Atencion',
      text: 'Esta a punto de borrar la orden numero ' + sale.order,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((borrar) => {
      if (borrar.value) {
        this.orderService.deleteOrder( sale.id )
                  .subscribe( () => {
                    swal.fire(
                      'Borrar!',
                      'La orden se ha eliminado.',
                      'success'
                    );
                    this.getOrders();
                  });
                }
    });

  }

}
