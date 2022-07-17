import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';
import { URL_SERVICES_IMG } from '../../../../config/config';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  
  public products : Product[] = [];
  public url = URL_SERVICES_IMG;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  	this.productsService.getProducts().subscribe(product => this.products = product);
  }

}
