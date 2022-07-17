import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/classes/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public products = [];
  loading: boolean = true;
  pageActual: number = 1;
  pageSize: number = 10;

  constructor(
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.loading = true;

    this.productsService.getProductsByUser().subscribe( (products: any) => {
      console.log(products);
      this.products = products;
      this.loading = false;
    });


  }

  activatedProduct(event, product: number) {
    console.log(event.target.checked);
    const activated = event.target.checked;

    this.productsService.activatedProduct(activated, product).subscribe( (product: any) => {
      console.log('Actualizado');
    });
  }

  deleteProduct( product: Product ) {

    Swal.fire({
      title: 'Atencion',
      text: 'Esta a punto de borrar a ' + product.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((borrar) => {
      if (borrar.value) {
        this.productsService.deleteProduct( product.id )
                  .subscribe( () => {
                    Swal.fire(
                      'Borrar!',
                      'El producto se ha eliminado.',
                      'success'
                    );
                    this.getProducts();
                  });
                }
    });

  }

}
