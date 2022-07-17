import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.css']
})
export class SalesOrdersComponent implements OnInit {

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
    this.orderService.getRents().subscribe( (sales: any) => {
      console.log(sales);
      this.sales = sales;
      // this.sales.map( (resp: any) => {
      //   console.log(resp.details[0].cover);
      //   this.sales.image = resp.details[0].cover;
      //   console.log(this.sales);
      //   // resp.details.map( (res) => {
      //   //   console.log(res.cover);
      //   //   sales.image = res.cover;
      //   // });
      // });
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
